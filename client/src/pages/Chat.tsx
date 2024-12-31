import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import useUser from '@/context/user/useUser'
import { Message, MessageDTO } from '@/entities/Message'
import MessageCard from '@/components/MessageCard'
import { RoomChatDTO } from '@/entities/Room'
import Button from '@/components/Button'
import ChatLayout from '@/layouts/ChatLayout'

const Chat = () => {
    const navigate = useNavigate()

    const { user } = useUser()

    const { roomId } = useParams()
    const [room, setRoom] = useState<RoomChatDTO | null>(null)

    const [receivedMessages, setReceivedMessages] = useState<Message[]>([])
    const [msgText, setMsgText] = useState<string>('')

    const messageContainerRef = useRef<HTMLDivElement>(null)

    // socket events
    useEffect(() => {
        if (!user) {
            return
        }

        user.socket.emit('joinRoom', roomId)

        user.socket.on('updateRoom', (room: RoomChatDTO) => {
            setRoom(room)
        })

        user.socket.on('updateRoomChat', (messagesDTO: MessageDTO[]) => {
            const messages = messagesDTO.map((m) => new Message(m))
            setReceivedMessages(messages)
        })

        user.socket.on(
            'updateRoomChatWithNewMessage',
            (messageDTO: MessageDTO) => {
                setReceivedMessages((prevReceivedMessages) => [
                    ...prevReceivedMessages,
                    new Message(messageDTO),
                ])
            }
        )

        user.socket.on('failedToJoin', () => {
            navigate('/rooms', {
                replace: true,
            })
        })

        // when user leaves the page emit leave room event
        return () => {
            user.socket.emit('leaveRoom', roomId, { name: user.name })

            // do a cleanup
            user.socket.off('joinRoom')
            user.socket.off('updateRoom')
            user.socket.off('updateRoomChatWithNewMessage')
            user.socket.off('updateRoomChat')
            user.socket.off('failedToJoin')
        }
    }, [user, roomId, navigate])

    // scroll to the end on new messages and if user is at the bottom of the container
    useEffect(() => {
        const container = messageContainerRef.current
        if (!container) {
            return
        }

        // aproximately one message gap to be scrolled down
        const THRESHOLD = 150 // px
        const isAtBottom =
            container.scrollHeight -
                container.scrollTop -
                container.clientHeight <=
            THRESHOLD

        if (isAtBottom) {
            container.scrollTop = container.scrollHeight
        }
    }, [receivedMessages])

    if (!user || !roomId) {
        return
    }

    const onSend = (e: React.FormEvent) => {
        e.preventDefault()

        user.socket.emit('sendMessageToRoom', roomId, msgText)

        setMsgText('')
    }

    if (!room) {
        return <>Loading..</>
    }

    return (
        <ChatLayout heading={room.name} subheading={room.description}>
            <div className="m-4 rounded-lg border-white bg-lightGray p-2">
                <p className="mr-2 inline font-bold">Users:</p>
                <span>{room.users.map((u) => u.name).join(', ')}</span>
            </div>

            <div
                ref={messageContainerRef}
                className="flex h-full flex-grow flex-col gap-2 overflow-y-scroll p-4"
            >
                {receivedMessages.map((msg, id) => (
                    <MessageCard
                        key={id}
                        msg={msg}
                        isMirrored={msg.sender.name === user.name}
                    />
                ))}
            </div>

            <form
                className="m-4 flex h-[5.5rem] flex-col justify-between rounded-xl bg-lightGray p-2"
                onSubmit={onSend}
            >
                <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    placeholder="Message"
                    value={msgText}
                    onChange={(e) => setMsgText(e.target.value)}
                />
                <div className="flex w-full flex-row">
                    <Button
                        type="submit"
                        className="ml-auto px-5 py-[0.175rem]"
                    >
                        Send now
                    </Button>
                </div>
            </form>
        </ChatLayout>
    )
}

export default Chat
