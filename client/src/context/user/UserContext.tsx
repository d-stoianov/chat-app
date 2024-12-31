import { createContext } from 'react'

import User from '@/entities/User'

interface UserContextI {
    user: User | null
    login: (u: User) => void
    logout: () => void
}

const UserContext = createContext<UserContextI>({
    user: null,
    login: () => {},
    logout: () => {},
})

export default UserContext
