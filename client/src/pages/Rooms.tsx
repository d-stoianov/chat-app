import RoomCard from '@/components/RoomCard'
import { useUser } from '@/context/UserContext'

const Rooms = () => {
    const { user } = useUser()

    if (!user) {
        return null
    }

    const rooms = [
        { name: 'my_perfect_room', userCount: 12 },
        {
            name: 'my_perfect_room',
            userCount: 5,
            description:
                'this is my beutiful room for chatting, please join :)',
        },
        {
            name: 'my_perfect_room',
            userCount: 3,
            description:
                'this is my beutiful room for chatting, please join :) this is my beutiful room for chatting, please join :) this is my beutiful room for chatting, please join :) this is my beutiful room for chatting, please join :) this is my beutiful room for chatting, please join :) this is my beutiful room for chatting, please join :)',
        },
        { name: 'my_perfect_room', userCount: 5 },
        { name: 'my_perfect_room', userCount: 5 },
        { name: 'my_perfect_room', userCount: 5 },
        { name: 'my_perfect_room', userCount: 5 },
        { name: 'my_perfect_room', userCount: 5 },
        { name: 'my_perfect_room', userCount: 5 },
    ]

    return (
        <main className="flex h-full w-full flex-col items-center bg-[#E0E0E0] px-8 py-6">
            <div className="mb-2 flex flex-col gap-2">
                <h1 className="text-center text-2xl text-black">
                    Welcome to the chat, {user.name}!
                </h1>
                <h1 className="text-md text-center text-black">
                    Fee free to join someone's room or create your own one
                </h1>
            </div>

            <section className="h-full max-h-[44rem] w-full overflow-auto rounded-xl bg-white sm:w-[26rem]">
                <button className="m-8 h-[2rem] w-[8rem] rounded-lg bg-blue-500 text-white">
                    Create Room
                </button>
                {rooms.map((r) => (
                    <div className="px-8 pb-8">
                        <RoomCard {...r} />
                    </div>
                ))}
            </section>
        </main>
    )
}

export default Rooms
