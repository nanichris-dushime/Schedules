import sequelize from '../config/db.js';
import '../database/models/index.js';

export const connectToDatabase = async () => {
    try{
        await sequelize.authenticate();
        console.log('Database connection established successfully');
        return { success: true, message: 'Database connection successful' };
    } catch (error) {
        console.error('Unable to connect to database:', error);
        return { success: false, message: 'Database connection failed' };
    }
};

export default sequelize;
