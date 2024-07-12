import express, { Request, Response } from "express"
import Database from "better-sqlite3"
import dotenv from "dotenv"

dotenv.config()

const router = express.Router()
const db = new Database(process.env.DATABASE, { fileMustExist: true })

router.get('/', (req: Request, res: Response) => {
    getCountries(res)
})

async function getCountries(res: Response) {
    try {
        const query = ("SELECT id as value, country as label FROM t_Countries ORDER BY country")

        const stmt = db.prepare(query)
        const data = await stmt.all() 

        res.status(200).json(data)
    } catch(err) {
        res.status(500).json(err)
    }
}

module.exports = router