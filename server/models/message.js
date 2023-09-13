import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userPicture: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model("Message", messageSchema)