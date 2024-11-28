interface MessageI {
    sender: string
    text: string
    date: Date
}

export interface MessageDTO {
    sender: string
    text: string
    date: string
}

export class Message implements MessageI {
    public sender: string
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
