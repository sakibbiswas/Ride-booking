
import express from 'express';
import { acceptRide, updateRideStatus, getDriverEarnings } from './driver.controller';
import authMiddleware from '../../middlewares/auth.middleware';
import { UserRole } from '../user/user.model';  

const router = express.Router();

router.post('/accept/:rideId', authMiddleware(UserRole.DRIVER), acceptRide);
router.patch('/update-status/:rideId', authMiddleware(UserRole.DRIVER), updateRideStatus);
router.get('/earnings', authMiddleware(UserRole.DRIVER), getDriverEarnings);

export default router;










