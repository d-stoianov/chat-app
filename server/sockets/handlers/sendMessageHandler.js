import Message from "../../models/message.js"

const sendMessageHandler = async (sockets, data, cb) => {
    console.log(data)

    const message = new Message({
        text: data.text,
        username: data.username,
        userPicture: data.userPicture,
    })

    try {
        await message.save()
        sockets.forEach((socket) => {
            socket.emit("receiveMessage", message)
        })
        cb(message)
    } catch (error) {
        cb({ success: false })
    }
}

export default sendMessageHandler
