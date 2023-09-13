import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { createMessage, deleteMessage, editMessage, getMessages } from "../controllers/messages.js"

const router = express.Router()

router.use(authMiddleware)

router.get("/", getMessages)

router.post("/", createMessage)

router.delete("/:id", deleteMessage)

router.patch("/:id", editMessage)

export default router