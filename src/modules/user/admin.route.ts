import express from 'express';
import { approveDriver, suspendDriver, viewSystemStats } from './admin.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import { UserRole } from '../user/user.model';  // path adjust করো

const router = express.Router();

router.patch('/approve-driver/:driverId', authMiddleware(UserRole.ADMIN), approveDriver);
router.patch('/suspend-driver/:driverId', authMiddleware(UserRole.ADMIN), suspendDriver);
router.get('/system-stats', authMiddleware(UserRole.ADMIN), viewSystemStats);

export default router;

