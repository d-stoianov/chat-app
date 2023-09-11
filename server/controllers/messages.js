import Message from "../models/message.js"

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find()
        res.json(messages)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createMessage = async (req, res) => {
    const message = new Message({
        text: req.body.text
    })

    try {
        const newMessage = await message.save()
        res.status(201).json(newMessage)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteMessage = async (req, res) => {
    const { id } = req.params

    try {
        const message = await Message.findByIdAndDelete(id)

        if (!message) {
            res.status(404).send("Message not found")
        } else {
            res.status(200).json(message)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const editMessage = async (req, res) => {
    const { id } = req.params

    const newText = req.body.text

    try {
        const message = await Message.findByIdAndUpdate(id, {text: newText}, {new: true})

        if (!message) {
            res.status(404).send("Message not found")
        } else {
            res.status(200).json(message)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}