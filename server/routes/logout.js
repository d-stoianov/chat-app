import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", authMiddleware, async (req, res) => {
    try {
        const decodedToken = jwt.decode(req.header("Authorization"), process.env.SECRET_KEY)

        if (!decodedToken) {
            return res.status(401).json({ message: "Invalid token" })
        }

        const { username } = decodedToken

        await User.findOneAndDelete({ username: username })

        res.status(200).json({ message: `User: ${username} logged out successfully` })
    } catch (error) {
        res.status(500).json({ message: "Logout failed" })
    }
})

export default router
