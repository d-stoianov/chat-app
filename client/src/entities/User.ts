import { Socket } from 'socket.io-client'

export interface UserDTO {
    name: string
}

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
