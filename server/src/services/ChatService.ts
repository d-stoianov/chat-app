import { Socket } from 'socket.io'
import { Server as SocketServer } from 'socket.io'

import MessageService from '@/services/MessageService'
import UserService from '@/services/UserService'

class ChatService {
    private io: SocketServer

    private userService: UserService
    private messageService: MessageService

    constructor(io: SocketServer) {
        this.io = io

        this.userService = new UserService(this.io)
        this.messageService = new MessageService(this.io)

        // inject dependencies after creating instances
        this.userService.setMessageService(this.messageService)
        this.messageService.setUserService(this.userService)
    }

    public handleUserEvents(socket: Socket) {
        socket.on('join', (name: string, cb: (response: string) => void) => {
            this.userService.joinUser(socket, name, cb)
        })

        // TODO: separate socket disconnection and chat disconnection
        socket.on('disconnect', () => {
            this.userService.disconnectUser(socket)
        })
    }

    public handleMessageEvents(socket: Socket) {
        socket.on(
            'sendMsg',
            (msgText: string, cb: (response: string) => void) => {
                this.messageService.sendMessage(socket, msgText, cb)
            }
        )
    }
}

export default ChatService
