import { useEffect, useState } from "react"
import ChatInput from "./ChatInput"
import Message from "./Message"
import Service from "../services/service"

const Chat = ({ username }) => {
    const [messages, setMessages] = useState([])

    const service = new Service()

    useEffect(() => {
        service.getMessages()
        .then(data => setMessages(data))
    }, [])

    const renderMessage = async (message) => {
        const newMessage = await service.sendMessage(message)
        setMessages([...messages, newMessage])
    }

    return (
        <main className="w-full h-full flex flex-col justify-between overflow-y-hidden">
            <div className="w-full px-4 py-1 mt-2 flex flex-col overflow-y-auto">
                {messages.map(msg => (
                    <Message
                        key={msg._id}
                        username={username}
                        message={msg}
                    />
                ))}
            </div>
            <ChatInput onMessage={renderMessage} />
        </main>
    )
}

export default Chat