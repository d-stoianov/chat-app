import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import useUser from '@/context/user/useUser'
import Button from '@/components/Button'
import BaseLayout from '@/layouts/BaseLayout'

const Home = () => {
    const { login } = useUser()
    const navigate = useNavigate()

    const [name, setName] = useState<string>('')

    const userNameInputRef = useRef<null | HTMLInputElement>(null)
    const [loginMessage, setLoginMessage] = useState<string>('')

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const userDTO = { name: name.trim() }

        const msg = await login(userDTO)
        if (msg.length === 0) {
            navigate('/rooms')
        } else {
            setLoginMessage(msg)
            userNameInputRef?.current?.focus()
        }
    }

    return (
        <BaseLayout>
            <form
                className="mt-[4rem] flex w-full flex-col items-center gap-2 px-8 sm:mt-[8rem] sm:w-[22rem]"
                onSubmit={onSubmit}
            >
                <input
                    ref={userNameInputRef}
                    type="text"
                    className={`w-full rounded-lg border-2 px-2 py-1.5 outline-none ${loginMessage.length > 0 && 'border-red-500'}`}
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button type="submit" className="w-full py-1.5">
                    Chat!
                </Button>
                <span className="text-red-500">{loginMessage}</span>
            </form>
        </BaseLayout>
    )
}

export default Home
