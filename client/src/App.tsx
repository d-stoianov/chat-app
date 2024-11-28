import { io, Socket } from 'socket.io-client'
import { useState } from 'react'

import Home from '@/Home'
import Chat from '@/Chat'
import User from '@/entities/User'

const App = () => {
    const [socket, setSocket] = useState<null | Socket>(null)
    const [name, setName] = useState<null | string>(null)

    const onSubmit = (e: React.FormEvent, name: string) => {
        e.preventDefault()

        const socket = io('http://localhost:3000')

        const user = new User(name)

        socket.emit('join', user.name, (response: string) => {
            if (response === 'success') {
                setSocket(socket)
                setName(user.name)
            } else {
                console.error('Failed to join')
            }
        })
    }

    const isLoggedIn = !!socket && !!name

    return isLoggedIn ? (
        <Chat socket={socket} name={name} />
    ) : (
        <Home onSubmit={onSubmit} />
    )
}

export default App
