import { Navigate, Outlet } from 'react-router'
import useUser from '@/context/user/useUser'

const ProtectedRoute = () => {
    const { user } = useUser()

    return user ? <Outlet /> : <Navigate to={'/'} />
}

export default ProtectedRoute
