import User from "@/types/User"

export interface MessageCreateDTO {
    sender: User
    text: string
}

export interface Message extends MessageCreateDTO {
    date: string
}
