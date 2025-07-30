
// import express from 'express';
// import {
//   getAllRides,
//   requestRide,
//   cancelRide,
//   updateStatus,
//   rideHistory,
// } from './ride.controller';
// import authMiddleware from '../../middlewares/auth.middleware';
// import { UserRole } from '../user/user.model';

// const router = express.Router();

// router.get('/', getAllRides); // Public GET all rides

// router.post('/', authMiddleware(UserRole.RIDER), requestRide);
// router.patch('/cancel/:id', authMiddleware(UserRole.RIDER), cancelRide);
// router.get('/me', authMiddleware(UserRole.RIDER, UserRole.DRIVER), rideHistory);
// router.patch('/:id/status', authMiddleware(UserRole.DRIVER), updateStatus);

// export default router;





import express from 'express';
import {
  getAllRides,
  requestRide,
  cancelRide,
  updateStatus,
  rideHistory,
} from './ride.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import { UserRole } from '../user/user.model';

const router = express.Router();

// Public - anyone can get all rides
router.get('/', getAllRides);

// Only riders can request and cancel a ride
router.post('/', authMiddleware(UserRole.RIDER), requestRide);
router.patch('/cancel/:id', authMiddleware(UserRole.RIDER), cancelRide);

// Both riders and drivers can view their ride history
router.get('/me', authMiddleware(UserRole.RIDER, UserRole.DRIVER), rideHistory);

// Only drivers can update ride status
router.patch('/:id/status', authMiddleware(UserRole.DRIVER), updateStatus);

export default router;