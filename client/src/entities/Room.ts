export interface RoomCreateDTO {
    name: string
    description?: string
}

export interface RoomDTO extends RoomCreateDTO {
    id: string
}

export interface RoomSummaryDTO extends RoomCreateDTO {
    userCount: number
}
