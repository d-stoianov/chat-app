import { useNavigate } from 'react-router'

import Button from '@/components/Button'
import { RoomSummaryDTO } from '@/entities/Room'

const RoomCard = ({ id, name, userCount, description }: RoomSummaryDTO) => {
    const navigate = useNavigate()

    return (
        <div className="grid w-full grid-cols-1 gap-2 rounded-lg border bg-white p-4">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-xl">{name}</h1>
                <p className="text-sm">Users: {userCount}</p>
            </div>
            <div className="flex justify-between">
                <p className="max-w-[75%] text-sm">{description}</p>

                <Button
                    onClick={() => {
                        navigate(`/room/${id}`)
                    }}
                    className="h-[1.5rem] w-[3.5rem]"
                >
                    Join
                </Button>
            </div>
        </div>
    )
}

export default RoomCard
