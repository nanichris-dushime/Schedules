import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = express.Router();

// Public
router.post('/login', userController.login);

// Admin + Manager — list employees only
router.get('/employees', authenticate, requireRole(['admin', 'manager']), userController.getEmployees);

// Admin only
router.post('/admin/users',       authenticate, requireRole(['admin']), userController.register);
router.get('/users',              authenticate, requireRole(['admin']), userController.getAllUsers);
router.put('/admin/users/:id',    authenticate, requireRole(['admin']), userController.updateUser);
router.delete('/admin/users/:id', authenticate, requireRole(['admin']), userController.deleteUser);

// Any authenticated user
router.get('/me',              authenticate, userController.getCurrentUser);
router.put('/me',              authenticate, userController.updateProfile);
router.patch('/me/password',   authenticate, userController.changePassword);

export default router;
