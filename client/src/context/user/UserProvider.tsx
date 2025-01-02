import { useState } from 'react'

import UserContext from '@/context/user/UserContext'
import User, { UserDTO } from '@/entities/User'

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    const login = async (user: User): Promise<boolean> => {
        const userDTO: UserDTO = { name: user.name }

        try {
            const response = await new Promise<string>((resolve) => {
                user.socket.emit('login', userDTO, resolve)
            })

            if (response === 'success') {
                setUser(user)
                return true
            }
            return false
        } catch (error) {
            console.error('login failed:', error)
            return false
        }
    }

    const logout = async (): Promise<boolean> => {
        try {
            const response = await new Promise<string>((resolve) => {
                user?.socket.emit('logout', resolve)
            })

            if (response === 'success') {
                setUser(null)
                return true
            }
            return false
        } catch (error) {
            return false
        }
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
