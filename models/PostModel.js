import { DataTypes } from 'sequelize';
import sequelizeDB from '../config/database.js';

const PostModel = sequelizeDB.define('post',
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
		images: {
			type: DataTypes.ARRAY(DataTypes.TEXT),
			defaultValue: [],
		},
		userId: {
			type: DataTypes.INTEGER,
		}
  }
);

export default PostModel