import Message from "../models/message.js"

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find()
        res.json(messages)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const editMessage = async (req, res) => {
    const { id } = req.params
    const username = req.user.username

    const newText = req.body.text

    try {
        const messageToEdit = await Message.findById(id)

        if (!messageToEdit) {
            res.status(404).send("Message not found")
        } else {
            if (messageToEdit.username !== username) {
                return res
                    .status(403)
                    .send("You do not have permission to edit this message")
            }

            const message = await Message.findByIdAndUpdate(
                id,
                { text: newText },
                { new: true }
            )

            res.status(200).json(message)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteMessage = async (req, res) => {
    const { id } = req.params
    const username = req.user.username

    try {
        const messageToDelete = await Message.findById(id)

        if (!messageToDelete) {
            res.status(404).send("Message not found")
        } else {
            if (messageToDelete.username !== username) {
                return res
                    .status(403)
                    .send("You do not have permission to delete this message")
            }

            const message = await Message.findByIdAndDelete(id)

            res.status(200).json(message)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
