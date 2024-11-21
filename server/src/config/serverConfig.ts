import { createServer, Server as HTTPServer } from 'http'
import { Server as SocketServer } from 'socket.io'

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
            origin: 'http://localhost:5173',
        },
    })

    return io
}
