
import express from 'express';
import {
  getAllRides,
  requestRide,
  cancelRide,
  updateStatus,
  rideHistory,
  estimateFare,
} from './ride.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import { UserRole } from '../user/user.model';
import { Driver } from '../driver/driver.model';

const router = express.Router();

router.get('/', getAllRides);

//  Estimate fare (no auth, Rider just checks fare)
router.get('/estimate', estimateFare);

// Rider actions
router.post('/', authMiddleware(UserRole.RIDER), requestRide);
router.patch('/cancel/:id', authMiddleware(UserRole.RIDER), cancelRide);

// Rider/Driver ride history
router.get('/me', authMiddleware(UserRole.RIDER, UserRole.DRIVER), rideHistory);

// Driver actions
router.patch('/:id/status', authMiddleware(UserRole.DRIVER), updateStatus);

//  New route: online drivers count for Rider
router.get(
  '/online-drivers',
  authMiddleware(UserRole.RIDER),
  async (req, res) => {
    try {
      const onlineDrivers = await Driver.countDocuments({ isOnline: true });
      res.json({ success: true, onlineDrivers });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

export default router;









