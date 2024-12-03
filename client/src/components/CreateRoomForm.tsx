import { RoomCreateDTO } from '@/entities/Room'
import { useState } from 'react'

const CreateRoomForm = ({
    onSubmit,
}: {
    onSubmit: (room: RoomCreateDTO) => void
}) => {
    const [room, setRoom] = useState<RoomCreateDTO>({
        name: '',
        description: '',
    })

    return (
        <>
            <form
                className="flex h-full w-full flex-col justify-around"
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit(room)
                }}
            >
                <h1 className="text-center text-lg">Create room</h1>
                <div className="flex flex-col gap-2">
                    <input
                        value={room.name}
                        onChange={(e) => {
                            setRoom({ ...room, name: e.target.value })
                        }}
                        className="rounded-lg px-2 py-1.5"
                        placeholder="Name"
                        type="text"
                    />
                    <textarea
                        value={room.description}
                        onChange={(e) => {
                            setRoom({ ...room, description: e.target.value })
                        }}
                        className="h-[8rem] resize-none px-2 py-1.5"
                        placeholder="Description"
                    />
                </div>
                <button className="h-[2rem] w-[8rem] self-center rounded-lg bg-blue-500 text-sm text-white">
                    Create
                </button>
            </form>
        </>
    )
}

export default CreateRoomForm
