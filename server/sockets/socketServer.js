import {Server} from "socket.io"
import sendMessageHandler from "./handlers/sendMessageHandler.js"

const setupSocketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: true,
        },
    })

    const sockets = []

    io.on("connection", (socket) => {
        console.log("connected")
        sockets.push(socket)

        socket.on("disconnect", () => {
            console.log("disconnected")
            sockets.splice(sockets.indexOf(socket), 1) // disconnect socket
        })

        socket.on("sendMessage", (data, cb) => {
            sendMessageHandler(sockets, data, cb)
        })
    })
}

export default setupSocketServer
