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

io.on('connection', (socket) => {
    console.log(`new connection with socket id: ${socket.id}`)

    socket.on('join', (name: string, cb: (response: string) => void) => {
        if (name.length > 0) {
            cb('success')
            io.emit('sendMessagesToAll', messages)
        } else {
            console.error(`name: ${name} is too short`)
            cb('fail')
        }
    })

    socket.on('sendMsg', (msgText: string, cb: (response: string) => void) => {
        if (msgText.length > 0) {
            const message = {
                sender: socket.id,
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
})
