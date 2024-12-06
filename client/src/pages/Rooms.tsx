import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import CreateRoomForm from '@/components/CreateRoomForm'
import Modal from '@/components/Modal'
import RoomCard from '@/components/RoomCard'
import { useUser } from '@/context/UserContext'
import { RoomDTO, RoomSummaryDTO } from '@/entities/Room'

const Rooms = () => {
    const { user } = useUser()

    const [showCreateRoomForm, setShowCreateRoomForm] = useState(false)
    const [rooms, setRooms] = useState<RoomSummaryDTO[]>([])

    const navigate = useNavigate()

    if (!user) {
        return null
    }

    useEffect(() => {
        user.socket.emit('requestRoomsSummaries')

        user.socket.on('updateRoomList', (rooms: RoomSummaryDTO[]) => {
            setRooms(rooms)
        })

        return () => {
            user.socket.off('updateRoomList')
        }
    }, [])

    console.log('rooms', rooms)

    return (
        <main className="flex min-h-screen w-full flex-col items-center bg-[#E0E0E0] px-8 py-6">
            <div className="mb-2 flex flex-col gap-2">
                <h1 className="text-center text-2xl text-black">
                    Welcome to the chat, {user.name}!
                </h1>
                <h1 className="text-md text-center text-black">
                    Fee free to join someone's room or create your own one
                </h1>
            </div>

            <section className="h-full min-h-[44rem] w-full overflow-auto rounded-xl bg-white sm:w-[26rem]">
                <button
                    onClick={() => setShowCreateRoomForm(true)}
                    className="m-8 h-[2rem] w-[8rem] rounded-lg bg-blue-500 text-white"
                >
                    Create Room
                </button>
                {rooms.map((r, idx) => (
                    <div key={idx} className="px-8 pb-8">
                        <RoomCard {...r} />
                    </div>
                ))}
            </section>
            {showCreateRoomForm && (
                <Modal onClose={() => setShowCreateRoomForm(false)}>
                    <CreateRoomForm
                        onSubmit={(room) => {
                            user.socket.emit(
                                'createRoom',
                                {
                                    name: user.name,
                                },
                                room
                            )
                            user.socket.on('roomCreated', (room: RoomDTO) => {
                                navigate(`/room/${room.id}`)
                            })
                        }}
                    />
                </Modal>
            )}
        </main>
    )
}

export default Rooms
