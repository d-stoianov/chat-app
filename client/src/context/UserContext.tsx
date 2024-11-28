import { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

import User from '@/entities/User'

interface UserContext {
    socket: Socket | null
    user: User | null
    login: (u: User) => void
    logout: () => void
}

const UserContext = createContext<UserContext>({
    socket: null,
    user: null,
    login: (_u: User) => {},
    logout: () => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [socket, setSocket] = useState<Socket | null>(null)

    // connect socket
    // and disconnect when they completely leave
    useEffect(() => {
        const skt = io('http://localhost:3000')
        setSocket(skt)

        return () => {
            skt.disconnect()
        }
    }, [])

    const login = (u: User) => {
        setUser(u)
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <UserContext.Provider value={{ socket, user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const ctx = useContext(UserContext)

    if (!ctx) {
        throw new Error('useUser must be used inside UserProvider')
    }

    return ctx
}
