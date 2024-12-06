import User from '@/entities/User'

export interface MessageDTO {
    sender: User
    text: string
    date: string
}

interface MessageI {
    sender: User
    text: string
    date: Date
}

export class Message implements MessageI {
    public sender: User
    public text: string
    public date: Date

    constructor(m: MessageI | MessageDTO) {
        this.sender = m.sender
        this.text = m.text
        this.date = typeof m.date === 'string' ? new Date(m.date) : m.date
    }

    public get formattedTime() {
        return `${('0' + this.date.getHours()).slice(-2)}:${(
            '0' + this.date.getMinutes()
        ).slice(-2)}`
    }
}
