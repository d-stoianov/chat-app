import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userPicture: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model("User", userSchema)