import { useEffect, useState, useRef } from "react"
import ChatInput from "./ChatInput"
import Message from "./Message"
import service from "../services/service"

const Chat = ({ username }) => {
    const [messages, setMessages] = useState([])
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const renderMessage = async (message) => {
        await service.sendMessage(message)
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        service.getMessages().then((data) => setMessages(data))

        service.addReceiveMessageListener((newMessage) => {
            setMessages((messages) => [...messages, newMessage])
        })

        return () => service.removeReceiveMessageListener()
    }, [])

    return (
        <main className="w-full h-full flex flex-col justify-between overflow-y-hidden">
            <div className="w-full px-4 py-1 mt-2 flex flex-col overflow-y-auto">
                {messages.map((msg) => (
                    <Message key={msg._id} username={username} message={msg} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <ChatInput onMessage={renderMessage} />
        </main>
    )
}

export default Chat
