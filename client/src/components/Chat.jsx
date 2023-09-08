import { useState } from "react"
import ChatInput from "./ChatInput"

const Chat = () => {
    const [messages, setMessages] = useState([])

    const renderMessage = (message) => {
        setMessages([...messages, message])
    }

    return (
        <main className="w-full h-full flex flex-col justify-between overflow-y-hidden">
            <div className="w-full h-full gap-0.5 px-4 py-1 flex flex-col overflow-y-auto">
                {messages.map((msg, idx) => (
                    <p 
                        key={idx}
                        className="text-zinc-200 self-end"
                    >
                        {msg}
                    </p>
                ))}
            </div>
            <ChatInput onMessage={renderMessage} />
        </main>
    )
}

export default Chat