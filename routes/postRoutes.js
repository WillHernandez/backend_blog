import { Router } from 'express'
import authJwt  from '../auth/jwtAuth.js'
import * as postCon from '../controllers/postControllers.js'
export const router = Router()

router.get('/getposts', authJwt, async (req, res) => {
	postCon.getUsersPosts(req, res)
})

router.get('/getpost/:id', authJwt, async (req, res) => {
	try {
		const post = await postCon.getPost(req.params.id, req.user.id)
		res.status(200).json(post)
	} catch(e) {
		res.status(400).json(e)
	}
})

router.post('/new', authJwt, (req, res) => {
	postCon.create(req, res)
})

router.patch('/update/:id', authJwt, (req, res) => {
	postCon.updatePost(req, res)
})