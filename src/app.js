import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes         from './routes/userRoutes.js';
import taskRoutes         from './routes/taskRoutes.js';
import assignmentRoutes   from './routes/assignmentRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import sequelize          from './config/db.js';
import './database/models/index.js';
import { seedUsers }      from './database/seeds/user.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app  = express();
const PORT = process.env.PORT || 5000;

// ── Gzip all responses ────────────────────────────────────
app.use(compression());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── API Routes ────────────────────────────────────────────
app.use('/api/users',         userRoutes);
app.use('/api/tasks',         taskRoutes);
app.use('/api/assignments',   assignmentRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/health', (_req, res) => res.json({ status: 'OK' }));

// ── Static files with aggressive caching ─────────────────
const frontendPath = path.join(__dirname, '..', 'Frontend');

// Cache fonts, icons, images for 1 year
app.use('/libs', express.static(path.join(frontendPath, 'libs'), {
  maxAge: '1y',
  immutable: true,
}));

// Cache JS and CSS for 1 day
app.use('/js', express.static(path.join(frontendPath, 'js'), {
  maxAge: '1d',
}));
app.use('/styles.css', express.static(path.join(frontendPath, 'styles.css'), {
  maxAge: '1d',
}));
app.use('/favicon.svg', express.static(path.join(frontendPath, 'favicon.svg'), {
  maxAge: '7d',
}));

// HTML pages — no cache (always fresh)
app.use(express.static(frontendPath, { maxAge: 0 }));

// SPA fallback
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ── Start: bind port FIRST, then connect DB ───────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectDB();
});

async function connectDB(retries = 5) {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    await sequelize.sync({ force: false });
    console.log('✅ Tables synced');
    await seedUsers();
    console.log('✅ Ready');
  } catch (err) {
    console.error(`❌ DB error: ${err.message}`);
    if (retries > 0) {
      console.log(`Retrying DB in 5s... (${retries} left)`);
      setTimeout(() => connectDB(retries - 1), 5000);
    } else {
      console.error('❌ Could not connect to database after retries.');
    }
  }
}

export default app;
