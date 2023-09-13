import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import messagesRoutes from "./routes/messages.js"
import loginRoutes from "./routes/login.js"

dotenv.config()

const app = express()
const PORT = 5000

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on("error", error => console.log(error))
db.once("open", () => console.log("Connected to the database"))

app.use(bodyParser.json())

app.use("/messages", messagesRoutes)
app.use("/login", loginRoutes)

app.get("/", (req, res) => res.send("you reached the home page"))

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))