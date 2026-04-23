import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

let sequelize;

if (process.env.DATABASE_URL) {
  // Render injects this automatically from render.yaml
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
    logging: false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  });
} else if (process.env.DB_HOST) {
  // Local development with individual env vars
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      dialect: 'mysql',
      logging: false,
      pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    }
  );
} else {
  // No DB config at all — will fail at authenticate() with a clear message
  sequelize = new Sequelize('sqlite::memory:', {
    dialect: 'sqlite',
    logging: false,
  });
  console.warn('⚠️  No DATABASE_URL or DB_HOST set. Set DATABASE_URL in Render environment variables.');
}

export default sequelize;
