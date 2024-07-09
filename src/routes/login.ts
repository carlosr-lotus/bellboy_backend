import express, { Request, Response } from "express"
import Database from "better-sqlite3"
import dotenv from "dotenv"

dotenv.config()

const router = express.Router()
const db = new Database(process.env.DATABASE, { fileMustExist: true })

router.get('/', (req: Request, res: Response) => {
    const {
        email,
        password
    } = req.query

    if (!email) res.status(400).json({ error: 'Email param not provided.' })
    if (!password) res.status(400).json({ error: 'Password param not provided.' })

    getUser(email as string, password as string, res)
})

function getUser(email: string, password: string, res: Response) {
    try {
        const query = "SELECT * FROM t_Users_Login WHERE email = ? and password = ?"

        const stmt = db.prepare(query)
        const row = stmt.get(email, password)

        res.status(200).json(row)
    } catch(err) {
        res.status(500).json(err)
    }
}

module.exports = router