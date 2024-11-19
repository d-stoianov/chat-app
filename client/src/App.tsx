import Chat from '@/Chat'
import Home from '@/Home'
import { useState } from 'react'
import { io, Socket } from 'socket.io-client'

const App = () => {
    const [socket, setSocket] = useState<null | Socket>(null)

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const socket = io('http://localhost:3000')
        setSocket(socket)
    }

    const isLoggedIn = !!socket

    return isLoggedIn ? <Chat socket={socket} /> : <Home onSubmit={onSubmit} />
}

export default App
