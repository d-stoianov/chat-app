import { createServer, Server as HTTPServer } from 'http'
import { Server as SocketServer } from 'socket.io'

import dotenv from 'dotenv'
dotenv.config()

const PORT = 3000

export const createHTTPServer = (): HTTPServer => {
    const server = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' })

        res.write('server is live')
        res.end()
    })

    server.listen(PORT, () => {
        console.log(`HTTP server is running on port - ${PORT}`)
    })

    return server
}

export const creatSocketServer = (httpServer: HTTPServer): SocketServer => {
    const io = new SocketServer(httpServer, {
        cors: {
            origin: process.env.ORIGIN_URL,
        },
    })

    return io
}
