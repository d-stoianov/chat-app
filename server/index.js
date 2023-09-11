import express from "express"
import bodyParser from "body-parser"

import messagesRoutes from "./routes/messages.js"

const app = express()
const PORT = 5000

app.use(bodyParser.json())

app.use("/messages", messagesRoutes)

app.get("/", (req, res) => res.send("you reched the home page"))

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))