import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

let sequelize;

if (process.env.DATABASE_URL) {
  // Render PostgreSQL — free tier
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
    logging: false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  });
} else {
  // Local development — MySQL
  sequelize = new Sequelize(
    process.env.DB_NAME     || 'schedules',
    process.env.DB_USER     || 'root',
    process.env.DB_PASSWORD || '',
    {
      host:    process.env.DB_HOST || 'localhost',
      port:    parseInt(process.env.DB_PORT || '3306'),
      dialect: 'mysql',
      logging: false,
      pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    }
  );
}

export default sequelize;
