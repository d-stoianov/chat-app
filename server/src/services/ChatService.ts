import { Server as SocketServer, Socket } from 'socket.io'

import RoomService from '@/services/RoomService'
import { RoomDTO, RoomCreateDTO } from '@/types/Room'
import User from '@/types/User'

class ChatService {
    private roomService = new RoomService()

    private io: SocketServer

    constructor(io: SocketServer) {
        this.io = io
    }

    public handleRoomEvents(socket: Socket) {
        // TODO make room events to not have user in parameter. map users with socket id

        socket.on('createRoom', (creator: User, room: RoomCreateDTO) => {
            const roomId = this.roomService.createRoom(
                room.name,
                room.description,
                creator
            )
            socket.join(roomId)

            const roomDTO: RoomDTO = { id: roomId, ...room }
            socket.emit('roomCreated', roomDTO)

            // TODO: later send only new created room not the whole list
            const roomsSummaries = this.roomService.getRoomsSummaries()
            this.io.emit('updateRoomList', roomsSummaries)
        })

        socket.on('requestRoomsSummaries', () => {
            const roomsSummaries = this.roomService.getRoomsSummaries()
            this.io.emit('updateRoomList', roomsSummaries)
        })

        socket.on('joinRoom', (roomId: string, user: User) => {
            const hasJoined = this.roomService.joinRoom(roomId, user)

            if (hasJoined) {
                socket.join(roomId)

                const roomChatDTO = this.roomService.getRoomChatDTOById(roomId)
                this.io.to(roomId).emit('updateRoom', roomChatDTO)

                const roomsSummaries = this.roomService.getRoomsSummaries()
                this.io.emit('updateRoomList', roomsSummaries)
            } else {
                socket.emit('failedToJoin')
            }
        })

        socket.on('leaveRoom', (roomId: string, user: User) => {
            this.roomService.leaveRoom(roomId, user)
            socket.leave(roomId)

            const roomChatDTO = this.roomService.getRoomChatDTOById(roomId)
            this.io.to(roomId).emit('updateRoom', roomChatDTO)

            const roomsSummaries = this.roomService.getRoomsSummaries()
            this.io.emit('updateRoomList', roomsSummaries)
        })
    }
}

export default ChatService
