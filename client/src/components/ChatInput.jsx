import { useState } from "react";

const ChatInput = ({ onMessage }) => {
    const [message, setMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const trimmedMessage = message.trim()
        if (trimmedMessage.length > 0) {
            onMessage(trimmedMessage)
        } else {
            alert("Invalid message")
        }
        setMessage("")
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex">
            <input 
                placeholder="Say something to the chat"
                className="w-[80%] md:w-[90%] outline-none p-1 py-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button 
                className="w-[20%] md:w-[10%] bg-blue-600 flex justify-center items-center font-bold text-white"
                type="submit"
            >
                Send
            </button>
        </form>
    )
}

export default ChatInput;
