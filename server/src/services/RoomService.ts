import { v4 as uuidv4 } from 'uuid'

import User from '@/types/User'
import { Room, RoomChatDTO, RoomSummaryDTO } from '@/types/Room'
import MessageService from '@/services/MessageService'
import { MessageCreateDTO, Message } from '@/types/Message'

class RoomService {
    // roomId: Room
    private rooms = new Map<string, Room>()

    public createRoom(
        name: string,
        description: string = '',
        creator: User
    ): string {
        const id = uuidv4()
        const room: Room = {
            id,
            name,
            description,
            users: [creator],
            messageService: new MessageService(),
        }
        this.rooms.set(id, room)

        return id
    }

    public joinRoom(roomId: string, user: User): boolean {
        const roomToJoin = this.rooms.get(roomId)

        if (roomToJoin) {
            const userExists = roomToJoin.users.find(
                (u) => u.name === user.name
            )
            if (userExists) {
                return true
            }

            roomToJoin.users.push(user)
            return true
        }

        return false
    }

    public leaveRoom(roomId: string, user: User): boolean {
        const roomToLeave = this.rooms.get(roomId)

        if (roomToLeave) {
            const newUsers = roomToLeave.users.filter(
                (u) => u.name !== user.name
            )
            roomToLeave.users = newUsers

            if (roomToLeave.users.length === 0) {
                this.deleteRoom(roomId)
            }

            return true
        }

        return false
    }

    public deleteRoom(roomId: string): boolean {
        return this.rooms.delete(roomId)
    }

    public getRoomChatDTOById(id: string): RoomChatDTO | undefined {
        const room = this.rooms.get(id)

        if (room) {
            const roomChatDTO: RoomChatDTO = {
                id: room.id,
                name: room.name,
                description: room.description,
                users: room.users,
            }

            return roomChatDTO
        }

        return undefined
    }

    public sendMessageToRoom(id: string, msg: MessageCreateDTO): boolean {
        const room = this.rooms.get(id)

        if (room) {
            return room.messageService.sendMessage(msg.sender, msg.text)
        }

        return false
    }

    public getRoomMessages(id: string): Message[] | undefined {
        const room = this.rooms.get(id)

        if (room) {
            return room.messageService.getAllMessages()
        }

        return undefined
    }

    public getRoomsSummaries(): RoomSummaryDTO[] {
        const rooms = Array.from(this.rooms.values())

        const roomsSummaries = rooms.map((r) => {
            const roomSummary: RoomSummaryDTO = {
                id: r.id,
                name: r.name,
                description: r.description,
                userCount: r.users.length,
            }
            return roomSummary
        })

        return roomsSummaries
    }
}

export default RoomService
