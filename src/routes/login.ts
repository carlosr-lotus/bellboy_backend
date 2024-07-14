import express, { Request, Response } from "express"
import Database from "better-sqlite3"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"

dotenv.config()

const router = express.Router()
const db = new Database(process.env.DATABASE, { fileMustExist: true })

function getErrorMessage(error: unknown): string | undefined {
    if (error instanceof Error) return error.message
    else String(error)
}

router.get('/', (req: Request, res: Response) => {
    const {
        email,
        password
    } = req.query

    if (!email) res.status(400).json({ error: 'Email param not provided.' })
    if (!password) res.status(400).json({ error: 'Password param not provided.' })

    getUser(email as string, password as string, res)
})

async function getUser(email: string, password: string, res: Response) {
    try {
        const query = "SELECT * FROM t_Login WHERE email = ?"

        const stmt = db.prepare(query)
        const row: any = await stmt.get(email)

        if (!row) res.status(204).json({ message: 'User not found.' })
        else {
            const pwMatch = await bcrypt.compare(password, row.password)

            if (pwMatch) 
                res.status(200).json({ message: true })
            else
                res.status(400).json({ message: false })
        }
    } catch(err) {
        res.status(500).json(err)
    }
}

router.post('/create', (req: Request, res: Response) => {
    const {
        name,
        email,
        password,
        createdAt,
        timezone,
        country
    } = req.query

    if (!name) res.status(400).json({ error: 'Name param not provided.' })
    if (!email) res.status(400).json({ error: 'Email param not provided.' })
    if (!password) res.status(400).json({ error: 'Password param not provided.' })
    if (!createdAt) res.status(400).json( { error: 'createdAt param not provided. '})
    if (!timezone) res.status(4000).json( { error: 'timezone param not provided. '})
    if (!country) res.status(400).json({ error: 'country param not provided.' })

    createUser(name as string, email as string, password as string, createdAt as string, timezone as string, country as string, res)
})

function createUser(name: string, email: string, password: string, createdAt: string, timezone: string, country: string, res: Response) {
    const passwordHash = bcrypt.hashSync(password, 10)

    try {
        const query = "INSERT INTO t_Login (name, email, password, createdAt, verified, timezone, country) VALUES(?, ?, ?, ?, ?, ?, ?)"

        const stmt = db.prepare(query)
        const result = stmt.run(name, email, passwordHash, createdAt, 0, timezone, country)

        res.status(200).json({ message: true, changes: result.changes })
    } catch(err) {
        const error = getErrorMessage(err)

        if (error?.includes('UNIQUE constraint')) 
            res.status(409).json({ message: 'Account already exists.' })
        else 
            res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = router