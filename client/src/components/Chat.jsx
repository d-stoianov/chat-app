import { useState } from "react"
import ChatInput from "./ChatInput"
import Message from "./Message"

const Chat = () => {
    const [messages, setMessages] = useState([])

    const renderMessage = (message) => {
        setMessages([...messages, message])
    }

    return (
        <main className="w-full h-full flex flex-col justify-between overflow-y-hidden">
            <div className="w-full h-full px-4 py-1 flex flex-col overflow-y-auto">
                {messages.map((msg, idx) => (
                    <Message
                        key={idx}
                        message={msg}
                    />
                ))}
            </div>
            <ChatInput onMessage={renderMessage} />
        </main>
    )
}

export default Chat