import { Server as SocketServer, Socket } from 'socket.io'

import RoomService from '@/services/RoomService'
import { RoomDTO, RoomCreateDTO } from '@/types/Room'
import User from '@/types/User'
import UserService from '@/services/UserService'
import { MessageCreateDTO } from '@/types/Message'
import { isNameValid } from '@/validations/userValidations'

class ChatService {
    private userService = new UserService()
    private roomService = new RoomService()

    private io: SocketServer

    constructor(io: SocketServer) {
        this.io = io
    }

    public handleUserEvents(socket: Socket) {
        socket.on('login', (u: User, cb: (msg: string) => void) => {
            if (isNameValid(u.name)) {
                this.userService.addUser(socket, u)
                cb('success')
            }
            cb('validation failed')
        })

        socket.on('logout', (cb: (msg: string) => void) => {
            this.userService.removeUser(socket)
            cb('success')
        })
    }

    public handleRoomEvents(socket: Socket) {
        socket.on('createRoom', (roomCreateDTO: RoomCreateDTO) => {
            const creator = this.userService.getUser(socket)

            if (!creator) {
                console.error(
                    `Couldn't find user with the socketId: ${socket.id}`
                )
                return
            }

            const room = this.roomService.createRoom(
                roomCreateDTO.name,
                roomCreateDTO.description,
                creator
            )
            socket.join(room.id)

            const roomDTO: RoomDTO = {
                id: room.id,
                name: room.name,
                description: room.description,
            }
            socket.emit('roomCreated', roomDTO)

            const roomSummary = this.roomService.getRoomSummary(room)
            this.io.emit('updateRoomCreated', roomSummary)
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

            const msgDTO: MessageCreateDTO = {
                sender: user,
                text: messageText,
            }
            const msg = this.roomService.sendMessageToRoom(roomId, msgDTO)
            if (msg) {
                this.io.to(roomId).emit('updateRoomChatWithNewMessage', msg)
            }
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
