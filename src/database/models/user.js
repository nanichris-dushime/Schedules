import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  fullName: { type: DataTypes.STRING, allowNull: false },
  email:    { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isIn: [['admin', 'manager', 'employee']] },
  },
}, { timestamps: true });

export default User;
