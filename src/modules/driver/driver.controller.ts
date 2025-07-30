
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { RideStatus } from '../ride/ride.model';
import * as rideService from '../ride/ride.service';

export const acceptRide = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  const { rideId } = req.params;
  const driverId = req.user.userId;

  try {
    const id = rideId.trim();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ride ID' });
    }

    const ride = await rideService.updateRideStatus(id, driverId, RideStatus.ACCEPTED);
    res.status(200).json(ride);
  } catch (err) {
    console.error('Accept ride error:', err);
    res.status(500).json({ message: 'Error accepting ride', error: err });
  }
};

export const updateRideStatus = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  const { rideId } = req.params;
  const { status } = req.body;
  const driverId = req.user.userId;

  if (!Object.values(RideStatus).includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const id = rideId.trim();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ride ID' });
    }

    const ride = await rideService.updateRideStatus(id, driverId, status);
    res.status(200).json(ride);
  } catch (err) {
    console.error('Update ride status error:', err);
    res.status(500).json({ message: 'Error updating ride status', error: err });
  }
};

export const getDriverEarnings = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  const driverId = req.user.userId;

  try {
    const rides = await rideService.getRideHistory(driverId, 'driver');
    const completedRides = rides.filter(r => r.status === RideStatus.COMPLETED);

    const totalEarnings = completedRides.reduce((sum, ride) => sum + (ride.fare || 0), 0);
    res.status(200).json({ totalEarnings, rideCount: completedRides.length });
  } catch (err) {
    console.error('Earnings error:', err);
    res.status(500).json({ message: 'Error fetching earnings', error: err });
  }
};









