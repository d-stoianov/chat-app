import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { useUser } from '@/context/UserContext'
import { Message, MessageDTO } from '@/entities/Message'
import MessageCard from '@/components/MessageCard'
import { RoomChatDTO } from '@/entities/Room'

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
        <main className="flex min-h-screen w-full flex-col items-center bg-[#E0E0E0] px-8 py-6">
            <div className="mb-4 max-w-[30rem] text-center">
                <h1 className="text-2xl text-black">
                    Welcome to the room {room.name}, {user.name}!
                </h1>
                <p>{room.description}</p>
            </div>
            <section className="relative flex h-full min-h-[44rem] w-full flex-col rounded-xl bg-white sm:w-[26rem]">
                <p>Users: {room.users.map((u) => u.name).join(', ')}</p>

                <div className="flex h-full flex-grow flex-col gap-2 overflow-y-auto p-4">
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
                        <button
                            type="submit"
                            className="ml-auto rounded-lg bg-black px-5 py-[0.175rem] text-center text-white hover:bg-hoverBlack"
                        >
                            Send now
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Chat
