import Chat from '@/Chat'
import Home from '@/Home'
import { useState } from 'react'
import { io, Socket } from 'socket.io-client'

const App = () => {
    const [socket, setSocket] = useState<null | Socket>(null)

    const onSubmit = (e: React.FormEvent, name: string) => {
        e.preventDefault()

        const socket = io('http://localhost:3000')

        socket.emit('join', name, (response: string) => {
            if (response === 'success') {
                setSocket(socket)
            } else {
                console.error('Failed to join')
            }
        })
    }

    const isLoggedIn = !!socket

    return isLoggedIn ? <Chat socket={socket} /> : <Home onSubmit={onSubmit} />
}

export default App
