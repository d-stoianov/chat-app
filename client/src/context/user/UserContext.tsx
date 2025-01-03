import { createContext } from 'react'

import User, { UserDTO } from '@/entities/User'

interface UserContextI {
    user: User | null
    login: (u: UserDTO) => Promise<string>
}

const UserContext = createContext<UserContextI>({
    user: null,
    login: async () => {
        console.warn('login function not implemented')
        return ''
    },
})

export default UserContext
