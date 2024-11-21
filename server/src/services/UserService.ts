import { Server as SocketServer, Socket } from 'socket.io'

import MessageService from '@/services/MessageService'
import User from '@/types/User'

class UserService {
    private userMap = new Map<string, User>()

    private io: SocketServer
    private messageService!: MessageService

    constructor(io: SocketServer) {
        this.io = io
    }

    public setMessageService(messageService: MessageService) {
        this.messageService = messageService
    }

    public joinUser(
        socket: Socket,
        name: string,
        cb: (response: string) => void
    ) {
        if (name.length > 0) {
            // check if name is already in the map
            for (const u of this.userMap.values()) {
                if (u.name === name) {
                    console.error(`name: ${name} already exists`)
                    cb('fail')

                    return
                }
            }

            const newUser: User = {
                name: name,
            }

            this.userMap.set(socket.id, newUser)
            cb('success')

            const allMessages = this.messageService.getAllMessages()
            socket.emit('sendMessagesToAll', allMessages)
        } else {
            console.error(`name: ${name} is too short`)
            cb('fail')
        }
    }

    public disconnectUser(socket: Socket) {
        // notify all users that user has disconnected
        const user = this.userMap.get(socket.id)
        if (user) {
            this.io.emit('userDisconnected', user.name)
        }

        this.userMap.delete(socket.id)
    }

    public getUser(socketId: string): User | undefined {
        return this.userMap.get(socketId)
    }
}

export default UserService
