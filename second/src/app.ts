import express from 'express'
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import action from "./routes/action.route"

const app = express()

dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use("/actions", action)

app.get('/', (req, res) => {
  res.send(`Server launched perfectly on ${req.protocol}://${req.get('host')}${req.originalUrl}`)
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})