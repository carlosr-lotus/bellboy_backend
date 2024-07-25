import express, { Request, Response } from "express"
import Database from "better-sqlite3"
import dotenv from "dotenv"
import { start } from "../automation/max" 

dotenv.config()

const router = express.Router()
const db = new Database(process.env.DATABASE, { fileMustExist: true })

router.get('/', (req: Request, res: Response) => {
    getServices(res)
})

async function getServices(res: Response) {
    try {
        const query = "SELECT id as value, name as label FROM t_Services"

        const stmt = db.prepare(query)
        const data = await stmt.all()

        res.status(200).json(data)
    } catch(err) {
        res.status(500).json(err)
    }
}

router.get('/user', (req: Request, res: Response) => {
    const { email, password } = req.query

    if (!email) res.status(400).json({ error: 'Email param not provided. '})    

    getUserServices(email as string, res)
})

async function getUserServices(email: string, res: Response) {
    try {
        const query = 
            `
            SELECT 
                ts.id,
                ts.name,
                ts.color,
                ts.status 
            FROM t_User_Services tus
            LEFT JOIN t_Login tl ON
                tus.id  = tl.id 
            LEFT JOIN t_Services ts ON
                tus.serviceID  = ts.id
            WHERE 
                tl.email = ? 
            ORDER BY ts.name 
            `
        
        const stmt = db.prepare(query)
        const data = await stmt.all(email)

        res.status(200).json(data)
    } catch(err) {
        res.status(500).json(err)
    }
}

router.get('/automate', (req: Request, res: Response) => {
    automate(res)
})

async function automate(res: Response) {
    const automationRes = await start('email', 'password')        
   
    res.send(automationRes)
}

module.exports = router
