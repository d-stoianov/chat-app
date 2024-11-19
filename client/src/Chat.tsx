import { useState } from 'react'
import { Socket } from 'socket.io-client'

interface Message {
    sender: string
    text: string
}

const Message = ({ sender, text }: Message) => {
    return (
        <div className="max-w-max rounded-lg bg-slate-100 px-3 py-1">
            <p>{sender}</p>
            <p>{text}</p>
        </div>
    )
}

const Chat = ({ socket }: { socket: Socket }) => {
    const [receivedMessages, setReceivedMessages] = useState<Message[]>([])
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

    socket.on('sendMessagesToAll', (messages: Message[]) => {
        console.log('messages', messages)
        setReceivedMessages(messages)
    })

    return (
        <main className="flex h-full w-full flex-col items-center bg-slate-800 px-8">
            <h1 className="py-4 text-center text-2xl text-white">
                Welcome to the chat
            </h1>
            <section className="relative w-full flex-grow rounded-t-2xl bg-slate-400 sm:w-[30rem]">
                <div className="flex flex-col gap-2 p-2">
                    {receivedMessages.map((msg, id) => (
                        <Message key={id} {...msg} />
                    ))}
                </div>
                <form
                    onSubmit={onSend}
                    className="absolute bottom-0 left-0 flex h-[4rem] w-full items-center gap-6 bg-slate-700 px-6"
                >
                    <input
                        type="text"
                        className="h-[2rem] w-full rounded-md px-2 outline-none"
                        value={msgText}
                        onChange={(e) => setMsgText(e.target.value)}
                    />
                    <button className="rounded-md px-6 py-1 text-white outline outline-white hover:bg-slate-50 hover:text-black">
                        Send
                    </button>
                </form>
            </section>
        </main>
    )
}

export default Chat
