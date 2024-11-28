import { Route, Routes } from 'react-router'

import Home from '@/pages/Home'
import Chat from '@/pages/Chat'
import ProtectedRoute from '@/router/ProtectedRoute'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" index element={<Home />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/chat" element={<Chat />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
