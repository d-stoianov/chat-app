import { useEffect, useState } from 'react'

import { useUser } from '@/context/UserContext'
import { Message } from '@/entities/Message'
import MessageCard from '@/components/MessageCard'
import { useLocation, useNavigate } from 'react-router'
import { RoomDTO } from '@/entities/Room'

const Chat = () => {
    const { user } = useUser()

    const navigate = useNavigate()
    const location = useLocation()

    const [receivedMessages, setReceivedMessages] = useState<Message[]>([])
    const [msgText, setMsgText] = useState<string>('')

    if (!user) {
        return
    }

    useEffect(() => {
        user.socket.emit('joinRoom', room.id, { name: user.name })

        user.socket.on('failedToJoin', () => {
            navigate('/rooms', {
                replace: true,
            })
        })

        // when user leaves the page emit leave room event
        return () => {
            user.socket.emit('leaveRoom', room.id, { name: user.name })
        }
    }, [])

    const room: RoomDTO = location.state

    const onSend = (e: React.FormEvent) => {
        e.preventDefault()
        setMsgText('')
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
                <div className="flex h-full flex-grow flex-col gap-2 overflow-y-auto p-4">
                    {receivedMessages.map((msg, id) => (
                        <MessageCard
                            key={id}
                            msg={msg}
                            isMirrored={msg.sender === user.name}
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
