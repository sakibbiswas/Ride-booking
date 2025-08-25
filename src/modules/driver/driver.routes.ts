
import express from 'express';
import {
  acceptRide,
  updateRideStatus,
  getDriverEarnings,
  toggleOnline,
  getActiveRide,
} from './driver.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import { UserRole } from '../user/user.model';

const router = express.Router();

router.post('/accept/:rideId', authMiddleware(UserRole.DRIVER), acceptRide);
router.patch('/update-status/:rideId', authMiddleware(UserRole.DRIVER), updateRideStatus);
router.get('/earnings', authMiddleware(UserRole.DRIVER), getDriverEarnings);

// Toggle online/offline
router.patch('/toggle-online', authMiddleware(UserRole.DRIVER), toggleOnline);

// Active ride
router.get('/active', authMiddleware(UserRole.DRIVER), getActiveRide);

export default router;
