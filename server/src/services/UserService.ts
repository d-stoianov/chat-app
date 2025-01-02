import User from '@/types/User'
import { Socket } from 'socket.io'

class UserService {
    private socketToUserMap = new Map<Socket, User>()

    public addUser(socket: Socket, user: User): void {
        this.socketToUserMap.set(socket, user)
    }

    public getUser(socket: Socket): User | undefined {
        return this.socketToUserMap.get(socket)
    }

    public removeUser(socket: Socket): boolean {
        return this.socketToUserMap.delete(socket)
    }

    public checkIfNameExists(name: string): boolean {
        for (const user of this.socketToUserMap.values()) {
            if (user.name === name) {
                return true
            }
        }
        return false
    }

    public logUsers() {
        console.log('users:')
        for (const user of this.socketToUserMap.values()) {
            console.log(user.name)
        }
    }
}

export default UserService
