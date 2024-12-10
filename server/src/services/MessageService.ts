import { Message } from '@/types/Message'
import User from '@/types/User'

class MessageService {
    private messages: Message[] = []

    public sendMessage(sender: User, msgText: string): Message | undefined {
        if (msgText.length > 0) {
            const message = {
                sender: sender,
                text: msgText,
                date: new Date().toISOString(),
            }
            this.messages.push(message)
            return message
        }
        console.error(`msg text: ${msgText} is not valid`)
        return undefined
    }

    public getAllMessages(): Message[] {
        return this.messages
    }
}

export default MessageService
