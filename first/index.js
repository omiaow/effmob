import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import products from "./routes/product.route.js"
import stocks from "./routes/stock.route.js"

const app = express()

dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(cors())
app.use("/products", products)
app.use("/stocks", stocks)

// to check if backend is not crashed
app.get("/", (req, res) => {
  res.send(`Server launched perfectly on ${req.protocol}://${req.get('host')}${req.originalUrl}`)
});

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`server started on port ${PORT}!`))