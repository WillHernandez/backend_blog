import { DataTypes } from 'sequelize';
import sequelizeDB from '../config/database.js';

const UserModel = sequelizeDB.define('user',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
			unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }
);

export default UserModel