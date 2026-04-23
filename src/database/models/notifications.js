import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const Notification = sequelize.define('Notification', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  message: { type: DataTypes.STRING(500) },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'system',
    validate: { isIn: [['shift', 'task', 'system']] },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'unread',
    validate: { isIn: [['read', 'unread']] },
  },
}, { timestamps: true });

export default Notification;
