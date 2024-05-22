import PostModel from '../models/PostModel.js'
import dotenv from 'dotenv'
import gcpBucket from '../config/gcp.js'
dotenv.config()

const bucket = gcpBucket.bucket(process.env.GCP_BUCKET_NAME)

export const create = async (req, res) => {
	let { description } = req.body
	const { email, id } = req.user
	// const file = bucket.file('images/bean.jpg')
	const file = bucket.file('images/shiba.jpg')
	const fileName = file.name.split("/").pop()
	try {
		// get values
		const { dataValues } = await PostModel.findOne({where: {userId: id}})

		if(dataValues.images.length < 5) {
			// upload file to gcp
			await bucket.upload( file.name, {destination: `${email}/${fileName}`})
			// retrieve all images from gcp
			const images = await getImageUrls(email)
			// write our full post with image urls to postgres
			const post = await PostModel.create({ description, images, userId: id })
			// const updatedTime = await sequelizeDB.query(`SELECT NOW() - (SELECT "createdAt" FROM posts WHERE id = ${post.dataValues.id})`)
			res.status(201).json(post.dataValues)
		} else {
			res.status(400).json({error: "Max of 5 images on a post"})
		}
	} catch(e) {
		console.log(e);
		res.status(400).json(e)
	}
}

const getImageUrls = async email => {
	let imageUrls = []
	const [objects] = await bucket.getFiles({prefix:email})
	for(let i = 1; i < objects.length; ++i) {
		imageUrls.push(objects[i].metadata.mediaLink)
	}
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
	return post
}