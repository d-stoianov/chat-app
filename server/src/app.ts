import * as http from 'http'
import { Server as SocketServer } from 'socket.io'

const PORT = 3000

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })

    res.write('server is live')
    res.end()
})

server.listen(PORT, () => {
    console.log(`HTTP server is running on port - ${PORT}`)
})

const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:5173',
    },
})

interface Message {
    sender: string
    text: string
}
const messages: Message[] = []

const userMap = new Map<string, string>()

io.on('connection', (socket) => {
    console.log(`new connection with socket id: ${socket.id}`)

    socket.on('join', (name: string, cb: (response: string) => void) => {
        if (name.length > 0) {
            // check if name is already in the map
            for (const n of userMap.values()) {
                if (n === name) {
                    console.error(`name: ${name} already exists`)
                    cb('fail')
                    return
                }
            }

            cb('success')
            io.emit('sendMessagesToAll', messages)
            userMap.set(socket.id, name)
        } else {
            console.error(`name: ${name} is too short`)
            cb('fail')
        }
    })

    socket.on('sendMsg', (msgText: string, cb: (response: string) => void) => {
        if (msgText.length > 0) {
            const message = {
                sender: userMap.get(socket.id) ?? socket.id,
                text: msgText,
            }
            messages.push(message)
            cb('success')

            io.emit('sendMessagesToAll', messages)
        } else {
            console.error(`msg text: ${msgText} is not valid`)
            cb('fail')
        }
    })

    // delete the user from the map when he disconnects
    // actually don't know yet, because it will be confusing,
    // since you see previous messages with the same user name
    socket.on('disconnect', () => {
        userMap.delete(socket.id)
    })
})
