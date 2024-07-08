import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000
const corsOptions = {
  origin: 'http://localhost:4000'
}

app.use(cors(corsOptions))

app.get("/serverStatus", (req: Request, res: Response) => {
  res.send({ status: 'online'} )
})

const loginRouter = require('./routes/login')

app.use('/login', loginRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})