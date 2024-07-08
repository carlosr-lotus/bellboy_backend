import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const loginRouter = require('./routes/login')

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use('/login', loginRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});