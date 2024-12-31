import { useContext } from 'react'
import UserContext from '@/context/user/UserContext'

const useUser = () => {
    const ctx = useContext(UserContext)

    if (!ctx) {
        throw new Error('useUser must be used inside UserProvider')
    }

    return ctx
}

export default useUser
