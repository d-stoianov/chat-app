import { useUser } from '@/context/UserContext'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = () => {
    const { user } = useUser()

    return user ? <Outlet /> : <Navigate to={'/'} />
}

export default ProtectedRoute
