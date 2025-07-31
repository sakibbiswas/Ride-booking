
import express from 'express';
import {
  getAllUsers,
  blockUser,
  unblockUser,
  approveDriver,
  suspendDriver,
  getMyProfile,
} from './user.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import { UserRole } from './user.model';

const router = express.Router();

//  Allow all authenticated users to access this
router.get('/me', authMiddleware(), getMyProfile);

// ✅ Admin-only
router.get('/', authMiddleware(UserRole.ADMIN), getAllUsers);
router.patch('/block/:id', authMiddleware(UserRole.ADMIN), blockUser);
router.patch('/unblock/:id', authMiddleware(UserRole.ADMIN), unblockUser);
router.patch('/approve/:id', authMiddleware(UserRole.ADMIN), approveDriver);
router.patch('/suspend/:id', authMiddleware(UserRole.ADMIN), suspendDriver);

export default router;

