import { Router } from 'express'
import * as userCon from '../controllers/userControllers.js'
export const router = Router()

router.post('/register', async (req, res) => {
	userCon.register(req, res)
})

router.post('/login', (req, res) => {
	userCon.login(req, res)
})