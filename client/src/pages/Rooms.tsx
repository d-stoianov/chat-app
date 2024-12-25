import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import CreateRoomForm from '@/components/CreateRoomForm'
import Modal from '@/components/Modal'
import RoomCard from '@/components/RoomCard'
import { useUser } from '@/context/UserContext'
import { RoomDTO, RoomSummaryDTO } from '@/entities/Room'
import Button from '@/components/Button'
import BaseLayout from '@/layouts/BaseLayout'

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

        user.socket.on('updateRoomCreated', (room: RoomSummaryDTO) => {
            setRooms((prevRooms) => [...prevRooms, room])
        })

        return () => {
            user.socket.off('updateRoomList')
            user.socket.off('updateRoomCreated')
        }
    }, [])

    return (
        <BaseLayout className="px-8 py-6">
            <div className="flex min-h-[6rem] flex-col gap-2">
                <h1 className="text-center text-2xl text-black">
                    Welcome to the chat, {user.name}!
                </h1>
                <h2 className="text-md text-center text-black">
                    Fee free to join someone's room or create your own one
                </h2>
            </div>

            <section className="mt-[1rem] flex h-[46rem] w-full flex-col overflow-hidden rounded-xl bg-white sm:h-[60rem] sm:w-[30rem] md:h-[70rem] xl:w-[38rem]">
                <Button
                    onClick={() => setShowCreateRoomForm(true)}
                    className="m-8 h-[2rem] w-[8rem] flex-none"
                >
                    Create Room
                </Button>
                <div className="flex-grow overflow-y-scroll">
                    {rooms.map((r, idx) => (
                        <div key={idx} className="px-8 pb-8">
                            <RoomCard {...r} />
                        </div>
                    ))}
                </div>
            </section>

            {showCreateRoomForm && (
                <Modal onClose={() => setShowCreateRoomForm(false)}>
                    <CreateRoomForm
                        onSubmit={(room) => {
                            user.socket.emit('createRoom', room)
                            user.socket.on('roomCreated', (room: RoomDTO) => {
                                navigate(`/room/${room.id}`)
                            })
                        }}
                    />
                </Modal>
            )}
        </BaseLayout>
    )
}

export default Rooms
