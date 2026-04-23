import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Assignment = sequelize.define("Assignment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "confirmed", "rejected"),
    defaultValue: "pending",
  },
}, {
  timestamps: true,
});

export default Assignment;
