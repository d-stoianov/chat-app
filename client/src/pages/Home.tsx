import { useState } from 'react'
import { useNavigate } from 'react-router'
import { io } from 'socket.io-client'

import { useUser } from '@/context/UserContext'
import User from '@/entities/User'
import Button from '@/components/Button'
import BaseLayout from '@/layouts/BaseLayout'

const Home = () => {
    const { login } = useUser()
    const navigate = useNavigate()

    const [name, setName] = useState<string>('')

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const skt = io(import.meta.env.VITE_SERVER_URL)
        const user = new User(name, skt)

        login(user)
        navigate('/rooms')
    }

    return (
        <BaseLayout>
            <form
                className="mt-[4rem] sm:mt-[8rem] flex w-full flex-col items-center gap-2 px-8 sm:w-[22rem]"
                onSubmit={onSubmit}
            >
                <input
                    type="text"
                    className="w-full rounded-lg px-2 py-1.5 outline-none"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button type="submit" className="w-full py-1.5">
                    Chat!
                </Button>
            </form>
        </BaseLayout>
    )
}

export default Home
