
import express from 'express';
import {
  getAllUsers,
  blockUser,
  unblockUser,
  approveDriver,
  suspendDriver,
  getMyProfile,
  updateMyProfile,
  updateMyPassword,
  updateMyEmergencyContacts,
  setOnlineStatus,
} from './user.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import { UserRole } from './user.model';

const router = express.Router();

// ✅ Authenticated user routes
router.get('/me', authMiddleware(), getMyProfile);
router.patch('/me', authMiddleware(), updateMyProfile);
router.patch('/password', authMiddleware(), updateMyPassword);
router.patch('/emergency-contacts', authMiddleware(), updateMyEmergencyContacts);
router.patch('/me/online', authMiddleware(), setOnlineStatus);

// ✅ Admin-only
router.get('/', authMiddleware(UserRole.ADMIN), getAllUsers);
router.patch('/block/:id', authMiddleware(UserRole.ADMIN), blockUser);
router.patch('/unblock/:id', authMiddleware(UserRole.ADMIN), unblockUser);
router.patch('/approve/:id', authMiddleware(UserRole.ADMIN), approveDriver);
router.patch('/suspend/:id', authMiddleware(UserRole.ADMIN), suspendDriver);

export default router;
