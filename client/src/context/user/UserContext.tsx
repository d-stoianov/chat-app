import { createContext } from 'react'

import User from '@/entities/User'

interface UserContextI {
    user: User | null
    login: (u: User) => Promise<string>
    logout: () => Promise<string>
}

const UserContext = createContext<UserContextI>({
    user: null,
    login: async () => {
        console.warn('login function not implemented')
        return ''
    },
    logout: async () => {
        console.warn('logout function not implemented')
        return ''
    },
})

export default UserContext
