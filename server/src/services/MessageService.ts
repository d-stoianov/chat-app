import { Socket, Server as SocketServer } from 'socket.io'

import UserService from '@/services/UserService'
import Message from '@/types/Message'

class MessageService {
    private messages: Message[] = []
    private io: SocketServer
    private userService!: UserService

    constructor(io: SocketServer) {
        this.io = io
    }

    public setUserService(userService: UserService) {
        this.userService = userService
    }

    public sendMessage(
        socket: Socket,
        msgText: string,
        cb: (response: string) => void
    ) {
        if (msgText.length > 0) {
            const message = {
                sender: this.userService.getUser(socket.id)?.name ?? socket.id,
                text: msgText,
                date: new Date().toISOString()
            }
            this.messages.push(message)
            cb('success')

            this.io.emit('sendMessagesToAll', this.messages)
        } else {
            console.error(`msg text: ${msgText} is not valid`)
            cb('fail')
        }
    }

    public getAllMessages(): Message[] {
        return this.messages
    }
}

export default MessageService
