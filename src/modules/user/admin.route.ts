import express from 'express';
import { approveDriver, suspendDriver, viewSystemStats } from './admin.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import { UserRole } from '../user/user.model';  // path adjust 
import { getAnalytics } from '../admin/analytics.controller';

const router = express.Router();

router.patch('/approve-driver/:driverId', authMiddleware(UserRole.ADMIN), approveDriver);
router.patch('/suspend-driver/:driverId', authMiddleware(UserRole.ADMIN), suspendDriver);
router.get('/system-stats', authMiddleware(UserRole.ADMIN), viewSystemStats);

// ... existing router lines
router.get('/system-stats', authMiddleware(UserRole.ADMIN), viewSystemStats);

// NEW analytics endpoint (admin only)
router.get('/analytics', authMiddleware(UserRole.ADMIN), getAnalytics);

export default router;



