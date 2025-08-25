
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Ride, RideStatus } from '../ride/ride.model';
import * as rideService from '../ride/ride.service';
import { User } from '../user/user.model';

// Accept ride
export const acceptRide = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  const { rideId } = req.params;
  const driverId = req.user.userId;

  if (!mongoose.Types.ObjectId.isValid(rideId)) {
    return res.status(400).json({ message: 'Invalid ride ID' });
  }

  try {
    const ride = await rideService.updateRideStatus(rideId, driverId, RideStatus.ACCEPTED);
    return res.status(200).json({ success: true, message: 'Ride accepted', data: ride });
  } catch (err) {
    return res.status(500).json({ message: 'Error accepting ride', error: err });
  }
};

// Update ride status
export const updateRideStatus = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  const { rideId } = req.params;
  const { status } = req.body;
  const driverId = req.user.userId;

  if (!Object.values(RideStatus).includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const ride = await rideService.updateRideStatus(rideId, driverId, status);
    return res.status(200).json({ success: true, message: 'Ride status updated', data: ride });
  } catch (err) {
    return res.status(500).json({ message: 'Error updating ride status', error: err });
  }
};

// Driver earnings
export const getDriverEarnings = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  const driverId = req.user.userId;

  try {
    const rides = await rideService.getRideHistory(driverId, 'driver');
    const completedRides = rides.filter(r => r.status === RideStatus.COMPLETED);
    const totalEarnings = completedRides.reduce((sum, ride) => sum + (ride.fare || 0), 0);

    return res.status(200).json({ success: true, totalEarnings, rideCount: completedRides.length });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching earnings', error: err });
  }
};

// Toggle online/offline
export const toggleOnline = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  const { isOnline } = req.body as { isOnline: boolean };

  const updated = await User.findByIdAndUpdate(
    req.user.userId,
    { isOnline: !!isOnline },
    { new: true }
  ).select('name email role isOnline isApproved isBlocked');

  return res.status(200).json({ success: true, message: 'Status updated', data: updated });
};

// Active ride
export const getActiveRide = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  const active = await Ride.findOne({
    driverId: req.user.userId,
    status: { $in: [RideStatus.ACCEPTED, RideStatus.PICKED_UP] },
  }).sort({ createdAt: -1 });

  return res.status(200).json({ success: true, message: 'Active ride', data: active || null });
};
