import { useState } from 'react'

import Button from '@/components/Button'
import { RoomCreateDTO } from '@/entities/Room'

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
                        className="rounded-lg border px-2 py-1.5"
                        placeholder="Name"
                        type="text"
                    />
                    <textarea
                        value={room.description}
                        onChange={(e) => {
                            setRoom({ ...room, description: e.target.value })
                        }}
                        className="h-[8rem] resize-none border px-2 py-1.5 rounded-lg"
                        placeholder="Description"
                    />
                </div>
                <Button className="h-[2rem] w-[8rem] self-center">
                    Create
                </Button>
            </form>
        </>
    )
}

export default CreateRoomForm
