import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import sequelize from './config/db.js';
import './database/models/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*', methods: ['GET','POST','PUT','PATCH','DELETE'], allowedHeaders: ['Content-Type','Authorization'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/health', (req, res) => res.json({ status: 'OK' }));

// Serve frontend static files from the Frontend directory
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, '..', 'Frontend');

app.use(express.static(frontendPath));

// SPA fallback: return index.html for unmatched GET routes (so frontend routing works)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.method !== 'GET') return next();
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: { drop: false } });
    console.log('✅ Database synced');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log('   POST /api/users/login');
      console.log('   POST /api/users/admin/users  (admin only)');
      console.log('   GET  /api/users/users        (admin only)');
      console.log('   GET  /api/tasks  |  POST /api/tasks');
      console.log('   GET  /api/assignments  |  POST /api/assignments');
      console.log('   GET  /api/notifications');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
