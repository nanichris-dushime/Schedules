import sequelize from "../config/db.js";
import "../database/models/index.js";
import { seedUsers } from "../database/seeds/user.js";
import { seedTasks } from "../database/seeds/task.js";
import { seedAssignments } from "../database/seeds/assignment.js";
import { seedNotifications } from "../database/seeds/notifications.js";

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });

    // Run seeds
    await seedUsers();
    await seedTasks();
    await seedAssignments();
    await seedNotifications();

    console.log("✅ All tables created and seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error syncing/seeding database:", error);
    process.exit(1);
  }
};

syncDatabase();
