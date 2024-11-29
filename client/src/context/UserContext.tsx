import { createContext, useContext, useState } from 'react'

import User from '@/entities/User'

interface UserContext {
    user: User | null
    login: (u: User) => void
    logout: () => void
}

const UserContext = createContext<UserContext>({
    user: null,
    login: (_u: User) => {},
    logout: () => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    const login = (u: User) => {
        setUser(u)
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
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
