import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = express.Router();

router.post('/login', userController.login);
router.post('/admin/users', authenticate, requireRole(['admin']), userController.register);
router.get('/users', authenticate, requireRole(['admin']), userController.getAllUsers);
router.get('/me', authenticate, userController.getCurrentUser);

export default router;
