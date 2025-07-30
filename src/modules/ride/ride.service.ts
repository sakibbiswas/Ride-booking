

import mongoose from 'mongoose';
import { Ride, RideStatus } from './ride.model';

export const getAllRides = async () => {
  return await Ride.find();
};

export const requestRide = async (
  riderId: string,
  pickupLocation: string,
  destination: string,
  pickupTime?: Date
) => {
  return await Ride.create({
    riderId: new mongoose.Types.ObjectId(riderId),
    pickupLocation,
    destination,
    pickupTime,
    status: RideStatus.REQUESTED,
    timestamps: { requestedAt: new Date() },
  });
};

export const cancelRide = async (rideId: string, userId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error('Ride not found');
  if (ride.riderId.toString() !== userId) throw new Error('Not authorized');
  if (ride.status !== RideStatus.REQUESTED) throw new Error('Cannot cancel ride');

  ride.status = RideStatus.CANCELLED;
  ride.timestamps.cancelledAt = new Date();
  return await ride.save();
};

export const updateRideStatus = async (
  rideId: string,
  driverId: string,
  newStatus: RideStatus
) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error('Ride not found');

  const driverObjectId = new mongoose.Types.ObjectId(driverId);

  if (ride.driverId && ride.driverId.toString() !== driverId) {
    throw new Error('You are not assigned to this ride');
  }

  if (!ride.driverId) ride.driverId = driverObjectId;

  switch (newStatus) {
    case RideStatus.ACCEPTED:
      ride.timestamps.acceptedAt = new Date();
      break;
    case RideStatus.PICKED_UP:
      ride.timestamps.pickedUpAt = new Date();
      break;
    case RideStatus.COMPLETED:
      ride.timestamps.completedAt = new Date();
      ride.fare = calculateFare();
      break;
  }

  ride.status = newStatus;
  return await ride.save();
};

export const getRideHistory = async (userId: string, role: string) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const query = role === 'rider' ? { riderId: userObjectId } : { driverId: userObjectId };
  return await Ride.find(query).sort({ createdAt: -1 });
};

const calculateFare = () => Math.floor(Math.random() * 300 + 150);

