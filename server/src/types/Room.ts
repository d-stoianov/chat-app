import User from '@/types/User'
import MessageService from '@/services/MessageService'

export interface RoomDTO {
    name: string
    description?: string
}

interface Room {
    id: string
    name: string
    description?: string
    users: User[]
}

export default Room
