import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import User from "../models/user.js"

const router = express.Router()

router.use(authMiddleware)

router.get("/", async (req, res) => {
    const { username } = req.user

    const user = await User.findOneAndUpdate({ username: username }, { updatedAt: Date.now() }, { new: true })

    res.status(200).json(user)
})

export default router