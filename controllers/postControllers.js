import PostModel from '../models/PostModel.js'
import dotenv from 'dotenv'
import gcpBucket from '../config/gcp.js'
dotenv.config()

const bucket = gcpBucket.bucket(process.env.GCP_BUCKET_NAME)

export const createPost = async (req, res) => {
	let { description } = req.body
	const { email, id } = req.user
	// const file = bucket.file('images/bean.jpg')
	// const file = bucket.file('images/shiba.jpg')
	const file = bucket.file('images/rick.jpg')
	const fileName = file.name.split("/").pop()
	try {
		// put into postgres with blank images arr
		const postCreate = await PostModel.create({ description, userId: id })
		// upload image to google cloud
		await bucket.upload( file.name, {destination: `${email}/${postCreate.id}/${fileName}`})
		// get image urls from google cloud
		const images = await getImageUrls(email, postCreate.id)
		// update postgres post with image urls
		await PostModel.update( {images},
			{ where: {id: postCreate.id, userId: id }})
		// get updated post from postgres
		const post = await PostModel.findByPk(postCreate.id) 
		// res = updated post from postgres
		res.status(201).json(post.dataValues)
	} catch(e) {
		res.status(400).json(e)
	}
}

const getImageUrls = async (email, id) => {
	const [ objects ] = await bucket.getFiles({prefix:`${email}/${id}`})
	const imageUrls = objects.map(img => img.metadata.mediaLink)
	return imageUrls
}

export const updatePostDesc = async (req, res) => {
	const { description } = req.body
	const { id } = req.params
	try {
		await PostModel.update(
			{description},
			{ where: {
					id,
					userId: req.user.id
				}
			})
		const post = await PostModel.findByPk(id)
		res.status(200).json(post.dataValues)
	} catch(e) {
		res.status(400).json(e)
	}
}

export const updatePostImages = async (req, res) => {
	const { email } = req.user
	const { id } = req.params
	const file = bucket.file('images/shiba.jpg')
	const fileName = file.name.split("/").pop()
	try {
		// upload file to gcp
		await bucket.upload( file.name, {destination: `${email}/${id}/${fileName}`})
		// get updated imageurls from gcp
		const images = await getImageUrls(email, id)
		// update postgres post with new images
		await PostModel.update( {images},
			{ where: {
					id,
					userId: req.user.id
				}
			})
		// updated postgres post
		const post = await PostModel.findByPk(id)
		res.status(200).json(post.dataValues)
	} catch(e) {
		res.status(400).json(e)
	}
}

export const getUsersPosts = async (req, res) => {
	const { id } = req.user
	try {
		const posts = await PostModel.findAll({ where: { userId: id }})
		res.status(200).json(posts)
	return posts
	} catch(e) {
		res.status(400).json(e)
	}
}