import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

const loginRouter = require('./routes/login')

app.get("/serverStatus", (req: Request, res: Response) => {
  res.send({ status: 'online'} )
})

app.use('/login', loginRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})