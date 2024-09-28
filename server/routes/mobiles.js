import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import MobilesController from '../controllers/mobiles.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const mobilesRouter = express.Router()

mobilesRouter.get('/', MobilesController.getMobiles)

mobilesRouter.get('/:mobileId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/mobile.html'))
})

export default mobilesRouter