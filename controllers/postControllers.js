import PostModel from '../models/PostModel.js'
import dotenv from 'dotenv'
import gcpBucket from '../config/gcp.js'
dotenv.config()

const bucket = gcpBucket.bucket(process.env.GCP_BUCKET_NAME)

export const create = async (req, res) => {
	let { description } = req.body
	const { email, id } = req.user
	// const file = bucket.file('images/bean.jpg')
	// const file = bucket.file('images/shiba.jpg')
	const file = bucket.file('images/rick.jpg')
	const fileName = file.name.split("/").pop()
	try {
		const postFind = await PostModel.findOne({where: {userId: id}})
		// if user has no posts or post contains < 5 images
		if(!postFind || postFind.dataValues.images.length < 5) {
			// upload file to google cloud bucket
			await bucket.upload( file.name, {destination: `${email}/${fileName}`})
			//retrieve all image urls from google cloud bucket
			const images = await getImageUrls(email)
			// write our full post with description & image urls to postgres
			const postCreate = await PostModel.create({ description, images, userId: id })
			res.status(201).json(postCreate.dataValues)
		} else {
			res.status(400).json({error: "Max of 5 images on a post"})
		}
	} catch(e) {
		console.log(e);
		res.status(400).json(e)
	}
}

const getImageUrls = async email => {
	const [ objects ] = await bucket.getFiles({prefix:email})
	const imageUrls = objects.map(img => img.metadata.mediaLink)
	return imageUrls
}

export const updatePost = async (req, res) => {
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
		const post = await getPost(id, req.user.id)
		res.status(200).json(post.dataValues)
	} catch(e) {
		res.status(400).json(e)
	}
}

export const getPost = async (id, userId) => {
	const post = await PostModel.findOne({ where: { id, userId }})
	return post.dataValues
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