import { DataTypes } from 'sequelize';
import sequelizeDB from '../config/database.js';

const FriendModel = sequelizeDB.define('friend',
  {
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		friendId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
  }
);

export default FriendModel 