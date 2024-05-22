import { Router } from 'express'
import authJwt  from '../auth/jwtAuth.js'
import * as friendCon from '../controllers/friendControllers.js'
export const router = Router()

router.post('/add', authJwt, (req, res) => {
	friendCon.addFriend(req, res)
})

router.get('/flist', authJwt, (req, res) => {
	friendCon.getFriends(req, res)
})

router.delete('/remove', authJwt, (req, res) => {
	friendCon.removeFriend(req, res)
})