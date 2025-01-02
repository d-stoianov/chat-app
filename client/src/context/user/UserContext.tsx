import { createContext } from 'react'

import User from '@/entities/User'

interface UserContextI {
    user: User | null
    login: (u: User) => Promise<boolean>
    logout: () => Promise<boolean>
}

const UserContext = createContext<UserContextI>({
    user: null,
    login: async () => {
        console.warn('login function not implemented')
        return false
    },
    logout: async () => {
        console.warn('logout function not implemented')
        return false
    },
})

export default UserContext
