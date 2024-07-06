import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cron from "node-cron"
import cleanupInactiveUsers from "./scripts/cleanupUsers.js"
import cleanupOldMessages from "./scripts/cleanupMessages.js"
import loginRoutes from "./routes/login.js"
import logoutRoutes from "./routes/logout.js"
import messagesRoutes from "./routes/messages.js"
import { createServer } from "http"
import setupSocketServer from "./sockets/socketServer.js"

dotenv.config()

const app = express()

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection
db.on("error", (error) => console.log(error))
db.once("open", () => console.log("Connected to the database"))

app.use(cors())
app.use(bodyParser.json())

app.use("/login", loginRoutes)
app.use("/logout", logoutRoutes)
app.use("/messages", messagesRoutes)

app.get("/", (req, res) => res.send("you reached the home page"))

cron.schedule("0 12 * * *", cleanupInactiveUsers)
cron.schedule("0 0 * * *", cleanupInactiveUsers)
cron.schedule("0 0 * * *", cleanupOldMessages)

const PORT = process.env.PORT || 5000

const server = createServer(app)
setupSocketServer(server)
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
