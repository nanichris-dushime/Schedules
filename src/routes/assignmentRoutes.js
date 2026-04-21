import express from 'express';
import * as assignmentController from '../controllers/assignmentController.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = express.Router();

router.get('/', authenticate, assignmentController.getAssignments);
router.post('/', authenticate, requireRole(['admin', 'manager']), assignmentController.createAssignment);

export default router;
