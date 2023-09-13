import User from "../models/user.js"

async function cleanupInactiveUsers() {
    try {
        console.log(`Cleanup started at ${new Date()}`)

        const oneHour = 1000 * 60 * 60
        const currentTime = new Date()
        const thresholdDate = new Date(currentTime - oneHour)

        const usersToDelete = await User.find({ updatedAt: { $lt: thresholdDate } })
        const result = await User.deleteMany({ updatedAt: { $lt: thresholdDate } })

        if (usersToDelete.length <= 0) {
            console.log("No users were deleted.");
        } else {
            console.log(`Users to delete: ${usersToDelete.length}`)
            usersToDelete.forEach(user => {
                console.log(user.username)
            })
        }

        console.log(`Cleanup completed. ${result.deletedCount} users removed`)
    } catch (error) {
        console.log(`Error cleaning up users: ${error}`)
    }
}

export default cleanupInactiveUsers