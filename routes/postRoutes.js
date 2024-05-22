import { Router } from 'express'
import authJwt  from '../auth/jwtAuth.js'
import * as postCon from '../controllers/postControllers.js'
export const router = Router()

router.post('/new', authJwt, (req, res) => {
	postCon.create(req, res)
})

router.patch('/update/:id', authJwt, (req, res) => {
	postCon.updatePost(req, res)
})

router.get('/get/:id', authJwt, async (req, res) => {
	try {
		const post = await postCon.getPost(req.params.id, req.user.id)
		res.status(200).json(post.dataValues)
	} catch (e) {
		res.status(400).json(e)
	}
})
