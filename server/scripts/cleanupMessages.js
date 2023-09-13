import Message from "../models/message.js"

async function cleanupOldMessages() {
    try {
        console.log(`Cleanup started at ${new Date()}`)

        const oneDay = 1000 * 60 * 60 * 24
        const currentTime = new Date()
        const thresholdDate = new Date(currentTime - oneDay)

        const messagesToDelete = await Message.find({ createdAt: { $lt: thresholdDate } })
        const result = await Message.deleteMany({ createdAt: { $lt: thresholdDate } })

        if (messagesToDelete.length <= 0) {
            console.log("No mesagges were deleted.");
        } else {
            console.log(`Messages to delete: ${messagesToDelete.length}`)
            messagesToDelete.forEach(message => {
                console.log(message)
            })
        }

        console.log(`Cleanup completed. ${result.deletedCount} messages removed`)
    } catch (error) {
        console.log(`Error cleaning up messages: ${error}`)
    }
}

export default cleanupOldMessages