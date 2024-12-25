import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { useUser } from '@/context/UserContext'
import { Message, MessageDTO } from '@/entities/Message'
import MessageCard from '@/components/MessageCard'
import { RoomChatDTO } from '@/entities/Room'
import Button from '@/components/Button'
import BaseLayout from '@/layouts/BaseLayout'

const Chat = () => {
    const navigate = useNavigate()

    const { user } = useUser()

    const { roomId } = useParams()
    const [room, setRoom] = useState<RoomChatDTO | null>(null)

    const [receivedMessages, setReceivedMessages] = useState<Message[]>([])
    const [msgText, setMsgText] = useState<string>('')

    if (!user || !roomId) {
        return
    }

    useEffect(() => {
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
    }, [])

    const onSend = (e: React.FormEvent) => {
        e.preventDefault()

        user.socket.emit('sendMessageToRoom', roomId, msgText)

        setMsgText('')
    }

    if (!room) {
        return <>Loading..</>
    }

    return (
        <BaseLayout className="px-8 py-6">
            <div className="flex min-h-[6rem] flex-col gap-2">
                <h1 className="text-center text-2xl text-black">
                    Welcome to the room {room.name}, {user.name}!
                </h1>
                <h2 className="text-md text-center text-black">
                    <p>{room.description}</p>
                </h2>
            </div>

            <section className="relative mt-[1rem] flex h-[46rem] w-full flex-col overflow-hidden rounded-xl bg-white sm:h-[60rem] sm:w-[30rem] md:h-[70rem] xl:w-[38rem]">
                <div className="m-4 rounded-lg border-white bg-lightGray p-2">
                    <p className="mr-2 inline font-bold">Users:</p>
                    <span>{room.users.map((u) => u.name).join(', ')}</span>
                </div>

                <div className="flex h-full flex-grow flex-col gap-2 overflow-y-scroll p-4">
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
                        placeholder="Message to the chat"
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
            </section>
        </BaseLayout>
    )
}

export default Chat
