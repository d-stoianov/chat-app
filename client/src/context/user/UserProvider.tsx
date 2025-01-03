import { useEffect, useState } from 'react'

import UserContext from '@/context/user/UserContext'
import User, { UserDTO } from '@/entities/User'
import { validateUserName } from '@/utils/validation'
import { io } from 'socket.io-client'

type LoginResponse = 'VALIDATION' | 'EXISTS' | 'SUCCESS'

const loginMessages = {
    VALIDATION: 'Validation failed',
    EXISTS: 'User with this name already exists',
    SUCCESS: '',
}

const socket = io(import.meta.env.VITE_SOCKET_API_URL, {
    path: import.meta.env.VITE_SOCKET_PATH,
    autoConnect: false,
})

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isSocketReady, setIsSocketReady] = useState(false)

    useEffect(() => {
        socket.connect()

        socket.on('connect', () => setIsSocketReady(true))
        socket.on('disconnect', () => setIsSocketReady(false))

        return () => {
            socket.off('connect')
            socket.off('disconnect')
        }
    }, [])

    const login = async (userDTO: UserDTO): Promise<string> => {
        if (!isSocketReady) {
            return 'Socket is not ready'
        }

        const user = new User(userDTO.name, socket)

        const isValid = validateUserName(user.name)
        if (!isValid) {
            return loginMessages.VALIDATION
        }

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
