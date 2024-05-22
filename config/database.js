import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelizeDB = new Sequelize(
		// process.env.POSTGRES_DB,
		// process.env.POSTGRES_USER,
		// process.env.POSTGRES_PASSWORD,
		"backend_blog_db",
		"postgres",
		"postgres",
	{
  host: 'db',
  dialect: 'postgres',
	}
);

export default sequelizeDB