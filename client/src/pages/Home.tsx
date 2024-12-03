import { useState } from 'react'
import { useNavigate } from 'react-router'
import { io } from 'socket.io-client'

import { useUser } from '@/context/UserContext'
import User from '@/entities/User'

const Home = () => {
    const { login } = useUser()
    const navigate = useNavigate()

    const [name, setName] = useState<string>('')

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const skt = io('localhost:3000')
        const user = new User(name, skt)

        login(user)
        navigate('/rooms')
    }

    return (
        <main className="flex h-full w-full flex-col items-center bg-lightGray">
            <form
                className="mt-24 flex w-full flex-col items-center gap-2 px-8 sm:w-[22rem]"
                onSubmit={onSubmit}
            >
                <input
                    type="text"
                    className="w-full rounded-lg px-2 py-1.5 outline-none"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full rounded-lg bg-black py-1.5 text-center text-white hover:bg-hoverBlack"
                >
                    Chat!
                </button>
            </form>
        </main>
    )
}

export default Home
