import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  message: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM("read", "unread"),
    defaultValue: "unread",
  },
}, {
  timestamps: true,
});

export default Notification;
