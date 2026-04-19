import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Assignment = sequelize.define("Assignment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  status: {
    type: DataTypes.ENUM("confirmed", "rejected"),
    defaultValue: "confirmed",
  },
}, {
  timestamps: true,
});

export default Assignment;
