import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import '@/index.css'
import AppRoutes from '@/router/AppRoutes'
import { UserProvider } from '@/context/UserContext'

createRoot(document.getElementById('root')!).render(
    <UserProvider>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    </UserProvider>
)
