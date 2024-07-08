import express, { Request, Response } from "express"
import Database from "better-sqlite3"
import dotenv from "dotenv"

dotenv.config()

const router = express.Router()
const db = new Database(process.env.DATABASE, {})

router.get('/', (req: Request, res: Response) => {
    getUsers(res)
})

function getUsers(res: Response) {
    try {
        const query = "SELECT * FROM t_Users"

        const data = db.prepare(query).all()

        res.status(200).json(data)
    } catch(err) {
        res.status(500).json(err)
    }
}

module.exports = router