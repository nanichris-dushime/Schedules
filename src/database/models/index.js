import User from "./user.js";
import Task from "./task.js";
import Assignment from "./assignment.js";
import Notification from "./notifications.js";

// Relationships

User.hasMany(Task, { foreignKey: "managerId" });
Task.belongsTo(User, { foreignKey: "managerId" });

User.hasMany(Assignment, { foreignKey: "employeeId" });
Assignment.belongsTo(User, { foreignKey: "employeeId" });

Task.hasMany(Assignment, { foreignKey: "taskId" });
Assignment.belongsTo(Task, { foreignKey: "taskId" });

User.hasMany(Notification, { foreignKey: "userId" });
Notification.belongsTo(User, { foreignKey: "userId" });

export { User, Task, Assignment, Notification };