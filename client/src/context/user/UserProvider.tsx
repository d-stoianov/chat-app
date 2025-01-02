import { useState } from 'react'

import UserContext from '@/context/user/UserContext'
import User, { UserDTO } from '@/entities/User'

type LoginResponse = 'VALIDATION' | 'EXISTS' | 'SUCCESS'
type LogoutResponse = 'SUCCESS'

const loginMessages = {
    VALIDATION: 'Validation failed',
    EXISTS: 'User with this name already exists',
    SUCCESS: '',
}

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    const login = async (user: User): Promise<string> => {
        const userDTO: UserDTO = { name: user.name }

        try {
            const response = await new Promise<LoginResponse>((resolve) => {
                user.socket.emit('login', userDTO, resolve)
            })

            const msg = loginMessages[response]

            if (response === 'SUCCESS') {
                setUser(user)
            }
            return msg
        } catch (error) {
            console.error('login failed:', error)
            return ''
        }
    }

    const logout = async (): Promise<string> => {
        try {
            const response = await new Promise<LogoutResponse>((resolve) => {
                user?.socket.emit('logout', resolve)
            })

            if (response === 'SUCCESS') {
                setUser(null)
            }
            return ''
        } catch (error) {
            return ''
        }
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
