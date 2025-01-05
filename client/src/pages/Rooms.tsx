import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import CreateRoomForm from '@/components/CreateRoomForm'
import Modal from '@/components/Modal'
import RoomCard from '@/components/RoomCard'
import useUser from '@/context/user/useUser'
import { RoomDTO, RoomSummaryDTO } from '@/entities/Room'
import Button from '@/components/Button'
import ChatLayout from '@/layouts/ChatLayout'

const Rooms = () => {
    const { user } = useUser()

    const [showCreateRoomForm, setShowCreateRoomForm] = useState(false)
    const [rooms, setRooms] = useState<RoomSummaryDTO[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            return
        }

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
    }, [user])

    if (!user) {
        return null
    }

    return (
        <ChatLayout
            heading={`Welcome to the chat, ${user.name}!`}
            subheading="Feel free to join someone's room or create your own one"
        >
            <section className="mt-[1rem] flex h-[46rem] w-full flex-col overflow-hidden rounded-xl bg-white sm:h-[60rem] sm:w-[30rem] md:h-[70rem] xl:w-[38rem]">
                <Button
                    onClick={() => setShowCreateRoomForm(true)}
                    className="m-8 h-[2rem] w-[8rem] flex-none"
                >
                    Create Room
                </Button>
                <div className="flex-grow overflow-y-auto">
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
                        prefilledRoomName={`${user.name}'s room`}
                        onSubmit={(room) => {
                            user.socket.emit('createRoom', room)
                            user.socket.on('roomCreated', (room: RoomDTO) => {
                                navigate(`/room/${room.id}`)
                            })
                        }}
                    />
                </Modal>
            )}
        </ChatLayout>
    )
}

export default Rooms
