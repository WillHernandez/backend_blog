import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import sequelizeDB from './config/database.js'
import { router as userRoutes } from './routes/userRoutes.js'
import { router as postRoutes } from './routes/postRoutes.js'
import { router as friendRoutes } from './routes/friendRoutes.js'
dotenv.config()
const app = express()
const port = 8080

const connectToPostgres = async () => {
	try {
		await sequelizeDB.authenticate()
		console.log('Postgres connection successfull.');
	} catch (error) {
		console.error('Unable to connect to Postgres:', error);
	}
}

app.use(cors())
app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/friend', friendRoutes)

app.listen(port, '0.0.0.0', async () => {
	await connectToPostgres()
	console.log(`Connected on port: ${port}`)
})