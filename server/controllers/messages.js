let messages = [
    {
        id: 1,
        username: "ryangosling321",
        text: "Hi tomato",
        timeStamp: "10/09/2023:21:18:03"
    },
    {
        id: 2,
        username: "ryangosling321",
        text: "Hi tomato",
        timeStamp: "10/09/2023:21:18:03"
    }
]

export const getMessages = (req, res) => {
    res.send(messages)
}

export const createMessage = (req, res) => {
    const message = req.body
    messages.push(message)

    res.send(messages)
}

export const deleteMessage = (req, res) => {
    const { id } = req.params

    messages = messages.filter(message => {
        return message.id != id
    })

    res.send(messages)
}

export const editMessage = (req, res) => {
    const { id } = req.params

    const messageToBeEdited = messages.find(message => {
        return message.id == id
    })

    const newText = req.body.text
    messageToBeEdited.text = newText

    res.send(messageToBeEdited)
}