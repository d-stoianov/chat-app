import { Socket } from 'socket.io-client'

interface UserI {
    socket: Socket
    name: string
}

class User implements UserI {
    public name
    public socket

    constructor(name: string, socket: Socket) {
        this.socket = socket
        this.name = name
    }
}

export default User
