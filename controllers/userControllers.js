import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel.js'
dotenv.config()

export const register = async (req, res) => {
	let { name, email, password } = req.body
	try {
		password = await bcrypt.hash(password, 10)
		await UserModel.create({ name, email, password })
		const accessToken = jwt.sign({ user: email }, process.env.JWT_TOKEN)
		res.status(201).json({ accessToken })
	} catch (e) {
		res.status(409).json(e)
	}
}

export const login = async (req, res) => {
	const { email, password } = req.body
	try {
		const dbUser = await UserModel.findOne({ where: { email: email } });
		const match = await bcrypt.compare(password, dbUser.password)
		if(match) {
			const accessToken = jwt.sign({ user: dbUser.dataValues }, process.env.JWT_TOKEN)
			res.status(202).json({ accessToken })
		} else {
			res.sendStatus(401)
		}
	} catch (e) {
		res.status(401).json(e)
	}
}