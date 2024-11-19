import { useState } from 'react'

const Home = ({
    onSubmit,
}: {
    onSubmit: (e: React.FormEvent, name: string) => void
}) => {
    const [name, setName] = useState<string>('')

    return (
        <main className="flex h-full w-full flex-col items-center bg-slate-800">
            <form
                className="mt-24 flex w-full flex-col items-center gap-2 px-8 sm:w-[22rem]"
                onSubmit={(e) => onSubmit(e, name)}
            >
                <input
                    className="w-full rounded-2xl p-2 outline-none"
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="name"
                />
                <button className="w-full rounded-2xl bg-white p-2 outline-none hover:bg-gray-100">
                    chat!
                </button>
            </form>
        </main>
    )
}

export default Home
