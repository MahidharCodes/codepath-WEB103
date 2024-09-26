import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import mobilesData from '../data/mobiles.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const mobilesRouter = express.Router()

mobilesRouter.get('/', (req, res) => {
    res.status(200).json(mobilesData)
})

mobilesRouter.get('/:mobileId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/mobile.html'))
})

export default mobilesRouter