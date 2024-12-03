import { v4 as uuidv4 } from 'uuid'

import Room from '@/types/Room'
import User from '@/types/User'
import MessageService from '@/services/MessageService'

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
        }
        this.rooms.set(id, room)

        return id
    }

    public joinRoom(roomId: string, user: User): boolean {
        const roomToJoin = this.rooms.get(roomId)

        if (roomToJoin) {
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
            return true
        }

        return false
    }

    public deleteRoom(roomId: string): boolean {
        return this.rooms.delete(roomId)
    }

    public getRoomByName(name: string): Room | undefined {
        for (const room of this.rooms.values()) {
            if (room.name === name) {
                return room
            }
        }
        return undefined
    }
}

export default RoomService
