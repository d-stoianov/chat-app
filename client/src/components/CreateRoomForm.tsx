import { useEffect, useRef, useState } from 'react'

import Button from '@/components/Button'
import { RoomCreateDTO } from '@/entities/Room'
import { validateRoomName } from '@/utils/validation'

interface CreateRoomFormProps {
    prefilledRoomName?: string
    onSubmit: (room: RoomCreateDTO) => void
}

const CreateRoomForm = ({
    prefilledRoomName,
    onSubmit,
}: CreateRoomFormProps) => {
    const [room, setRoom] = useState<RoomCreateDTO>({
        name: prefilledRoomName ?? '',
        description: '',
    })

    const roomNameInputRef = useRef<null | HTMLInputElement>(null)
    const [isRoomNameValid, setIsRoomNameValid] = useState<boolean>(true)

    useEffect(() => {
        if (validateRoomName(room.name.trim())) {
            setIsRoomNameValid(true)
        }
    }, [room.name])

    const onRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoom({ ...room, name: e.target.value })
    }

    const onRoomDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setRoom({ ...room, description: e.target.value })
    }

    return (
        <>
            <form
                className="flex h-full w-full flex-col justify-around"
                onSubmit={(e) => {
                    e.preventDefault()

                    if (validateRoomName(room.name.trim())) {
                        onSubmit(room)
                    } else {
                        setIsRoomNameValid(false)
                        roomNameInputRef?.current?.focus()
                    }
                }}
            >
                <h1 className="text-center text-lg">Create room</h1>
                <div className="flex flex-col gap-2">
                    <input
                        ref={roomNameInputRef}
                        value={room.name}
                        onChange={onRoomNameChange}
                        className={`rounded-lg border-2 px-2 py-1.5 ${!isRoomNameValid && 'border-red-500 focus:outline-none'}`}
                        placeholder="Name"
                        type="text"
                    />
                    <textarea
                        value={room.description}
                        onChange={onRoomDescriptionChange}
                        maxLength={300}
                        className="h-[8rem] resize-none rounded-lg border-2 px-2 py-1.5"
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
