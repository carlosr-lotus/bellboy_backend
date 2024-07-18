import express, { Request, Response } from "express"
import Database from "better-sqlite3"
import dotenv from "dotenv"

dotenv.config()

const router = express.Router()
const db = new Database(process.env.DATABASE, { fileMustExist: true })

router.get('/', (req: Request, res: Response) => {
    automate(res)
})

async function automate(res: Response) {
    res.status(200).json({ message: 'Okay' })
}