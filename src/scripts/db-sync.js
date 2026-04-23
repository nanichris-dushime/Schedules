import sequelize from '../config/db.js';
import '../database/models/index.js';
import { seedUsers } from '../database/seeds/user.js';

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    await sequelize.sync({ alter: { drop: false } });
    console.log('✅ Tables synced');
    await seedUsers();
    console.log('✅ Seed complete');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

syncDatabase();
