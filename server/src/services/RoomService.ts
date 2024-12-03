import { v4 as uuidv4 } from 'uuid'

import User from '@/types/User'
import { Room, RoomSummaryDTO } from '@/types/Room'

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
            const userExists = roomToJoin.users.find(
                (u) => u.name === user.name
            )
            if (userExists) {
                return false
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

    public getRoomByName(name: string): Room | undefined {
        for (const room of this.rooms.values()) {
            if (room.name === name) {
                return room
            }
        }
        return undefined
    }

    public getRoomsSummaries(): RoomSummaryDTO[] {
        const rooms = Array.from(this.rooms.values())

        const roomsSummaries = rooms.map((r) => {
            const roomSummary: RoomSummaryDTO = {
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
