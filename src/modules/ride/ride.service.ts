import mongoose from 'mongoose';
import { Ride, RideStatus } from './ride.model';

// Get all rides
export const getAllRides = async () => {
  return await Ride.find();
};

// Get ride by ID
export const getRideById = async (rideId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error('Ride not found');
  return ride;
};

// Rider requests a ride
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

// Rider cancels ride
export const cancelRide = async (rideId: string, userId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error('Ride not found');
  if (ride.riderId.toString() !== userId) throw new Error('Not authorized');
  if (ride.status !== RideStatus.REQUESTED) throw new Error('Cannot cancel ride');

  ride.status = RideStatus.CANCELLED;
  ride.timestamps.cancelledAt = new Date();
  return await ride.save();
};

// Estimate fare
export const estimateFare = async (pickup: string, destination: string) => {
  const distanceKm = Math.floor(Math.random() * 10) + 2;
  const durationMin = distanceKm * 3;
  const baseFare = 50;
  const perKmRate = 20;
  const estimatedFare = baseFare + distanceKm * perKmRate;

  return { estimatedFare, distanceKm, durationMin };
};

// Update ride status
export const updateRideStatus = async (
  rideId: string,
  driverId: string,
  newStatus: RideStatus
) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error('Ride not found');

  const driverObjectId = new mongoose.Types.ObjectId(driverId);

  if (newStatus === RideStatus.ACCEPTED) {
    if (ride.status !== RideStatus.REQUESTED) throw new Error('Ride not available');
    ride.driverId = driverObjectId;
    ride.status = RideStatus.ACCEPTED;
    ride.timestamps.acceptedAt = new Date();
    return await ride.save();
  }

  if (!ride.driverId || ride.driverId.toString() !== driverId)
    throw new Error('Not assigned to this ride');

  switch (newStatus) {
    case RideStatus.PICKED_UP:
      if (ride.status !== RideStatus.ACCEPTED) throw new Error('Must accept first');
      ride.status = RideStatus.PICKED_UP;
      ride.timestamps.pickedUpAt = new Date();
      break;
    case RideStatus.COMPLETED:
      if (ride.status !== RideStatus.PICKED_UP) throw new Error('Must pick up first');
      ride.status = RideStatus.COMPLETED;
      ride.timestamps.completedAt = new Date();
      ride.fare = calculateFare();
      break;
    case RideStatus.CANCELLED:
      ride.status = RideStatus.CANCELLED;
      ride.timestamps.cancelledAt = new Date();
      break;
  }

  return await ride.save();
};

// Ride history
export const getRideHistory = async (userId: string, role: string) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const query = role === 'rider' ? { riderId: userObjectId } : { driverId: userObjectId };
  return await Ride.find(query).sort({ createdAt: -1 });
};

// Fare calculation
const calculateFare = () => Math.floor(Math.random() * 300 + 150);





























