import { useState } from 'react'

const Home = ({
    onSubmit,
}: {
    onSubmit: (e: React.FormEvent, name: string) => void
}) => {
    const [name, setName] = useState<string>('')

    return (
        <main className="bg-lightGray flex h-full w-full flex-col items-center">
            <form
                className="mt-24 flex w-full flex-col items-center gap-2 px-8 sm:w-[22rem]"
                onSubmit={(e) => onSubmit(e, name)}
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
                    className="hover:bg-hoverBlack w-full rounded-lg bg-black py-1.5 text-center text-white"
                >
                    Chat!
                </button>
            </form>
        </main>
    )
}

export default Home
