import express from "express"
import { createMessage, deleteMessage, editMessage, getMessages } from "../controllers/messages.js"

const router = express.Router()

router.get("/", getMessages)

router.post("/", createMessage)

router.delete("/:id", deleteMessage)

router.patch("/:id", editMessage)

export default router