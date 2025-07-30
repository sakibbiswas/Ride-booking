



import { Request, Response } from 'express';
import * as RideService from './ride.service';
import sendResponse from '../../utils/sendResponse';

export const getAllRides = async (req: Request, res: Response) => {
  const rides = await RideService.getAllRides();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All rides fetched successfully',
    data: rides,
  });
};

export const requestRide = async (req: Request, res: Response) => {
  const { pickupLocation, destination, pickupTime } = req.body; // use destination here
  const riderId = req.user?.userId!;

  const ride = await RideService.requestRide(riderId, pickupLocation, destination, pickupTime);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Ride requested successfully',
    data: ride,
  });
};

export const cancelRide = async (req: Request, res: Response) => {
  const rideId = req.params.id;
  const userId = req.user?.userId!;
  const ride = await RideService.cancelRide(rideId, userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Ride cancelled successfully',
    data: ride,
  });
};

export const updateStatus = async (req: Request, res: Response) => {
  const rideId = req.params.id;
  const { status } = req.body;
  const driverId = req.user?.userId!;
  const ride = await RideService.updateRideStatus(rideId, driverId, status);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Ride status updated to ${status}`,
    data: ride,
  });
};

export const rideHistory = async (req: Request, res: Response) => {
  const userId = req.user?.userId!;
  const role = req.user?.role!;
  const history = await RideService.getRideHistory(userId, role);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Ride history fetched successfully',
    data: history,
  });
};
