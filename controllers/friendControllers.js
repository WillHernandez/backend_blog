import dotenv from 'dotenv'
import FriendModel from '../models/FriendModel.js'
import UserModel from '../models/UserModel.js'
dotenv.config()

export const addFriend = async (req, res) => {
	const { friendId } = req.body
	const { id } = req.user
	try {
		await FriendModel.create({ userId: id, friendId })
		res.sendStatus(200)
	} catch(e) {
		res.status(400).json(e)
	}
}

export const getFriends = async (req, res) => {
	const { id } = req.user
	try {
		const fIds = await FriendModel.findAll({ userId: id })
		const fDetails = await getFDetails(fIds)
		res.status(200).json(fDetails)
	} catch(e) {
		res.status(400).json(e)
	}
}

const getFDetails = async fIds => {
	const promises = fIds.map(f => UserModel.findByPk(f.dataValues.friendId))
	const fFullData = await Promise.all(promises)
	const limitedData = []
	fFullData.forEach(f => data.push({ name: f.name, email: f.email }))
	return limitedData
}

export const removeFriend = async (req, res) => {
	const { friendId } = req.body
	const { id } = req.user
	try {
		await FriendModel.destroy({
			where: {
				userId: id,
				friendId
			}
		})
		res.sendStatus(200)
	} catch(e) {
		res.status(400).json(e)
	}
}