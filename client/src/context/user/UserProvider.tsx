import { useState } from 'react'

import UserContext from '@/context/user/UserContext'
import User, { UserDTO } from '@/entities/User'

type LoginResponse = 'VALIDATION' | 'EXISTS' | 'SUCCESS'

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

    return (
        <UserContext.Provider value={{ user, login }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
