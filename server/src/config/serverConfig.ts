import { createServer, Server as HTTPServer } from 'http'
import { Server as SocketServer } from 'socket.io'

import dotenv from 'dotenv'
dotenv.config()

const HTTP_PORT = 3000
const SOCKET_PORT = 3001

export const createHTTPServer = (): HTTPServer => {
    const server = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' })

        res.write('Server is live')
        res.end()
    })

    server.listen(HTTP_PORT, () => {
        console.log(`HTTP server is running on port - ${HTTP_PORT}`)
    })

    return server
}

export const createSocketServer = (): SocketServer => {
    const server = createServer()

    const io = new SocketServer(server, {
        cors: {
            origin: process.env.ORIGIN_URL,
        },
        path:
            process.env.BASE_URL && process.env.BASE_URL.length > 0
                ? `/${process.env.BASE_URL}/api`
                : '/api',
    })

    server.listen(SOCKET_PORT, () => {
        console.log(`WebSocket server is running on port - ${SOCKET_PORT}`)
    })

    return io
}
