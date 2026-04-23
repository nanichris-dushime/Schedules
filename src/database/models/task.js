import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const Task = sequelize.define('Task', {
  id:        { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title:     { type: DataTypes.STRING, allowNull: false },
  date:      { type: DataTypes.DATEONLY, allowNull: false },
  startTime: { type: DataTypes.TIME, allowNull: false },
  endTime:   { type: DataTypes.TIME, allowNull: false },
  managerId: { type: DataTypes.UUID, allowNull: true },
}, { timestamps: true, tableName: 'tasks', freezeTableName: true });

export default Task;
