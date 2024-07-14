import express, { Request, Response } from "express"
import Database from "better-sqlite3"
import dotenv from "dotenv"

dotenv.config()

const router = express.Router()
const db = new Database(process.env.DATABASE, { fileMustExist: true })

router.get('/', (req: Request, res: Response) => {
    getServices(res)
})

function getServices(res: Response) {
    try {
        const query = "SELECT id as value, name as label FROM t_Services"

        const stmt = db.prepare(query)
        const data = stmt.all()

        res.status(200).json(data)
    } catch(err) {
        res.status(500).json(err)
    }
}

module.exports = router