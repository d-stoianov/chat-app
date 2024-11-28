import { useState } from 'react'

import { useUser } from '@/context/UserContext'
import { MessageDTO, Message } from '@/entities/Message'
import MessageCard from '@/components/MessageCard'

const Chat = () => {
    const { socket, user } = useUser()

    const [receivedMessages, setReceivedMessages] = useState<Message[]>([])
    const [msgText, setMsgText] = useState<string>('')

    const onSend = (e: React.FormEvent) => {
        e.preventDefault()

        socket?.emit('sendMsg', msgText, (response: string) => {
            if (response === 'success') {
            } else {
                console.error('failed to send a message')
            }
        })
        setMsgText('')
    }

    // TODO: messages are dissappearing when switching pages

    socket?.on('sendMessagesToAll', (messageDTOs: MessageDTO[]) => {
        const messages = messageDTOs.map((m) => {
            return new Message({ ...m })
        })
        setReceivedMessages(messages)
    })

    return (
        <main className="flex h-full w-full flex-col items-center bg-[#E0E0E0] px-8 py-6">
            <h1 className="pb-4 text-center text-2xl text-black">
                Welcome to the chat, {user?.name}!
            </h1>
            <section className="relative flex h-full max-h-[44rem] w-full flex-col rounded-xl bg-white sm:w-[26rem]">
                <div className="flex h-full flex-grow flex-col gap-2 overflow-y-auto p-4">
                    {receivedMessages.map((msg, id) => (
                        <MessageCard
                            key={id}
                            msg={msg}
                            isMirrored={msg.sender === user?.name}
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
