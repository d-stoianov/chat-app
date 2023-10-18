import { Server } from "socket.io"
import sendMessageHandler from "./handlers/sendMessageHandler.js"

const setupSocketServer = () => {
    const io = new Server({
        cors: {
            origin: "http://localhost:3000",
        },
    })

    const sockets = []

    io.listen(4000)

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
