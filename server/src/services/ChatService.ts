import { Server as SocketServer, Socket } from 'socket.io'

import RoomService from '@/services/RoomService'
import { RoomDTO, RoomCreateDTO } from '@/types/Room'
import User from '@/types/User'
import UserService from '@/services/UserService'
import { MessageCreateDTO } from '@/types/Message'

class ChatService {
    private userService = new UserService()
    private roomService = new RoomService()

    private io: SocketServer

    constructor(io: SocketServer) {
        this.io = io
    }

    public handleUserEvents(socket: Socket) {
        socket.on('login', (u: User) => {
            this.userService.addUser(socket, u)
        })

        socket.on('logout', () => {
            this.userService.removeUser(socket)
        })
    }

    public handleRoomEvents(socket: Socket) {
        socket.on('createRoom', (room: RoomCreateDTO) => {
            const creator = this.userService.getUser(socket)

            if (!creator) {
                console.error(
                    `Couldn't find user with the socketId: ${socket.id}`
                )
                return
            }

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

        socket.on('joinRoom', (roomId: string) => {
            const user = this.userService.getUser(socket)

            if (!user) {
                console.error(
                    `Couldn't find user with the socketId: ${socket.id}`
                )
                return
            }

            const hasJoined = this.roomService.joinRoom(roomId, user)

            if (hasJoined) {
                socket.join(roomId)

                // update everyone with new room info (like users array)
                const roomChatDTO = this.roomService.getRoomChatDTOById(roomId)
                this.io.to(roomId).emit('updateRoom', roomChatDTO)

                // update the socket that just joined with the existing room messages
                const messages = this.roomService.getRoomMessages(roomId)
                socket.emit('updateRoomChat', messages)

                // update every socket that subscribed to room list, with new rooms info (like new users count)
                const roomsSummaries = this.roomService.getRoomsSummaries()
                this.io.emit('updateRoomList', roomsSummaries)
            } else {
                socket.emit('failedToJoin')
            }
        })

        socket.on('leaveRoom', (roomId: string) => {
            const user = this.userService.getUser(socket)
            if (!user) {
                console.error(
                    `Couldn't find user with the socketId: ${socket.id}`
                )
                return
            }

            this.roomService.leaveRoom(roomId, user)
            socket.leave(roomId)

            const roomChatDTO = this.roomService.getRoomChatDTOById(roomId)
            this.io.to(roomId).emit('updateRoom', roomChatDTO)

            const roomsSummaries = this.roomService.getRoomsSummaries()
            this.io.emit('updateRoomList', roomsSummaries)
        })

        socket.on('sendMessageToRoom', (roomId: string, messageText) => {
            const user = this.userService.getUser(socket)
            if (!user) {
                console.error(
                    `Couldn't find user with the socketId: ${socket.id}`
                )
                return
            }

            const msg: MessageCreateDTO = {
                sender: user,
                text: messageText,
            }
            this.roomService.sendMessageToRoom(roomId, msg)

            const messages = this.roomService.getRoomMessages(roomId)
            this.io.to(roomId).emit('updateRoomChat', messages)
        })

        socket.on('disconnect', () => {
            const user = this.userService.getUser(socket)
            if (!user) {
                console.error(
                    `Couldn't find user with the socketId: ${socket.id}`
                )
                return
            }

            const room = this.roomService.getRoomByUser(user)

            if (!room) {
                console.error(`Couldn't find room with this user: ${user.name}`)
                return
            }

            this.roomService.leaveRoom(room.id, user)
            socket.leave(room.id)

            const roomChatDTO = this.roomService.getRoomChatDTOById(room.id)
            this.io.to(room.id).emit('updateRoom', roomChatDTO)

            const roomsSummaries = this.roomService.getRoomsSummaries()
            this.io.emit('updateRoomList', roomsSummaries)
        })
    }
}

export default ChatService
