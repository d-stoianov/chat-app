import { useState } from 'react'
import { Socket } from 'socket.io-client'

interface MessageI {
    sender: string
    text: string
    date: Date
}

interface MessageDTOI {
    sender: string
    text: string
    date: string
}

const Message = ({
    sender,
    text,
    date,
    isMirrored = false,
}: MessageI & { isMirrored: boolean }) => {
    return (
        <div
            className={`flex w-full flex-col ${isMirrored ? 'items-end' : 'items-start'}`}
        >
            <p className="px-1 text-center">{sender}</p>

            <div
                className={`flex max-w-[90%] justify-between gap-2 rounded-xl px-3 py-1 text-black ${isMirrored ? 'bg-lightYellow' : 'bg-lightGray'}`}
            >
                <p className="py-1">{text}</p>
                <p className="self-end text-[0.75rem]">
                    {('0' + date.getHours()).slice(-2)}:
                    {('0' + date.getMinutes()).slice(-2)}
                </p>
            </div>
        </div>
    )
}

const Chat = ({ socket, name }: { socket: Socket; name: string }) => {
    const [receivedMessages, setReceivedMessages] = useState<MessageI[]>([])
    const [msgText, setMsgText] = useState<string>('')

    const onSend = (e: React.FormEvent) => {
        e.preventDefault()

        socket.emit('sendMsg', msgText, (response: string) => {
            if (response === 'success') {
            } else {
                console.error('failed to send a message')
            }
        })
        setMsgText('')
    }

    socket.on('sendMessagesToAll', (messagesDTO: MessageDTOI[]) => {
        const messages = messagesDTO.map((m) => {
            return { ...m, date: new Date(m.date) }
        })
        setReceivedMessages(messages)
    })

    return (
        <main className="flex h-full w-full flex-col items-center bg-[#E0E0E0] px-8 py-6">
            <h1 className="pb-4 text-center text-2xl text-black">
                Welcome to the chat, {name}!
            </h1>
            <section className="relative flex h-full max-h-[44rem] w-full flex-col rounded-xl bg-white sm:w-[26rem]">
                <div className="flex h-full flex-grow flex-col gap-2 overflow-y-auto p-4">
                    {receivedMessages.map((msg, id) => (
                        <Message
                            key={id}
                            sender={msg.sender === name ? '' : msg.sender}
                            text={msg.text}
                            date={msg.date}
                            isMirrored={msg.sender === name}
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
