import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = express.Router();

router.get('/', authenticate, taskController.getAllTasks);
router.post('/', authenticate, requireRole(['admin', 'manager']), taskController.createTask);

export default router;
