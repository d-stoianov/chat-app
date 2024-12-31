import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import '@/index.css'
import AppRoutes from '@/router/AppRoutes'
import UserProvider from '@/context/user/UserProvider'

const basename =
    import.meta.env.VITE_BASE_PATH && import.meta.env.VITE_BASE_PATH.length > 0
        ? `/${import.meta.env.VITE_BASE_PATH}`
        : ''

createRoot(document.getElementById('root')!).render(
    <UserProvider>
        <BrowserRouter basename={basename}>
            <AppRoutes />
        </BrowserRouter>
    </UserProvider>
)
