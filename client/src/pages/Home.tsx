import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { io } from 'socket.io-client'

import useUser from '@/context/user/useUser'
import User from '@/entities/User'
import Button from '@/components/Button'
import BaseLayout from '@/layouts/BaseLayout'
import { isNameValid } from '@/utils/validation'

const Home = () => {
    const { login } = useUser()
    const navigate = useNavigate()

    const [name, setName] = useState<string>('')
    const [isValid, setIsValid] = useState<boolean>(true)

    useEffect(() => {
        if (!isValid && isNameValid(name.trim())) {
            setIsValid(true)
        }
    }, [isValid, name])

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!isNameValid(name.trim())) {
            setIsValid(false)
            return
        }

        const skt = io(import.meta.env.VITE_SOCKET_API_URL, {
            path: import.meta.env.VITE_SOCKET_PATH,
        })
        const user = new User(name.trim(), skt)

        const isLoggedIn = await login(user)
        if (isLoggedIn) {
            navigate('/rooms')
        }
    }

    return (
        <BaseLayout>
            <form
                className="mt-[4rem] flex w-full flex-col items-center gap-2 px-8 sm:mt-[8rem] sm:w-[22rem]"
                onSubmit={onSubmit}
            >
                <input
                    type="text"
                    className={`w-full rounded-lg border-2 px-2 py-1.5 outline-none ${!isValid && 'border-red-500'}`}
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
