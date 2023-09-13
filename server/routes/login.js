import express from "express"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/", (req, res) => {
    const { username, userPicture } = req.body
    if (!username) {
        return res.status(400).json({ message: "Username is required" })
    }

    const tokenData = { username }

    if (userPicture) {
        tokenData.userPicture = userPicture
    }

    const token = jwt.sign(tokenData, process.env.SECRET_KEY)

    res.json({ token })
})

export default router