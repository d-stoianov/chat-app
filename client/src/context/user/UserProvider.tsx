import { useState } from 'react'

import UserContext from '@/context/user/UserContext'
import User, { UserDTO } from '@/entities/User'

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    const login = (u: User) => {
        const userDTO: UserDTO = {
            name: u.name,
        }
        u.socket.emit('login', userDTO)
        setUser(u)
    }

    const logout = () => {
        user?.socket.emit('logout')
        setUser(null)
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
