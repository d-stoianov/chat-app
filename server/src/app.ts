import { createHTTPServer, creatSocketServer } from '@/config/serverConfig'
import ChatService from '@/services/ChatService'

const httpServer = createHTTPServer()
const io = creatSocketServer(httpServer)

const chatService = new ChatService(io)

io.on('connection', (socket) => {
    console.log(`new connection with socket id: ${socket.id}`)

    chatService.handleUserEvents(socket)
    chatService.handleRoomEvents(socket)
})
