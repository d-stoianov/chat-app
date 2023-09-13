import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/user.js"

const router = express.Router()

router.post("/", async (req, res) => {
    const { username, userPicture } = req.body

    if (!username) {
        return res.status(400).json({ message: "Username is required" })
    }

    const existingUser = await User.findOne({ username })

    if (existingUser) {
        return res.status(400).json({ message: "Username is already in use" })
    }

    const tokenData = { username }

    const newUser = new User({ username: username })

    if (userPicture) {
        tokenData.userPicture = userPicture
        newUser.userPicture = userPicture
    }

    await newUser.save()

    const token = jwt.sign(tokenData, process.env.SECRET_KEY)

    res.json({ token })
})

export default router