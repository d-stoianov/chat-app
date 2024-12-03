import { Socket } from 'socket.io'

import RoomService from '@/services/RoomService'
import { RoomDTO } from '@/types/Room'
import User from '@/types/User'

class ChatService {
    private roomService = new RoomService()

    public handleRoomEvents(socket: Socket) {
        socket.on('createRoom', (creator: User, room: RoomDTO) => {
            const roomId = this.roomService.createRoom(
                room.name,
                room.description,
                creator
            )
            socket.join(roomId)

            socket.emit('roomCreated', {id: roomId, ...room})
        })

        socket.on('joinRoom', (roomName: string, user: User) => {
            const room = this.roomService.getRoomByName(roomName)
            if (room) {
                this.roomService.joinRoom(room.id, user)
                socket.join(roomName)
            }
        })

        socket.on('leaveRoom', (roomName: string) => {
            const room = this.roomService.getRoomByName(roomName)
            if (room) {
                this.roomService.deleteRoom(room.id)
                socket.leave(roomName)
            }
        })

        socket.on('deleteRoom', (roomName: string) => {
            const room = this.roomService.getRoomByName(roomName)
            if (room) {
                this.roomService.deleteRoom(room.id)
                socket.leave(roomName)
            }
        })

        // TODO: separate socket disconnection and chat disconnection
        socket.on('leaveRoom', () => {})
    }
}

export default ChatService
