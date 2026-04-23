import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const Assignment = sequelize.define('Assignment', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
    validate: { isIn: [['pending', 'confirmed', 'rejected']] },
  },
}, { timestamps: true, tableName: 'assignments', freezeTableName: true });

export default Assignment;
