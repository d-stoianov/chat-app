import User from '@/types/User'

export interface RoomCreateDTO {
    name: string
    description?: string
}

export interface RoomDTO extends RoomCreateDTO {
    id: string
}

export interface RoomSummaryDTO extends RoomDTO {
    userCount: number
}

export interface Room extends RoomDTO {
    users: User[]
}
