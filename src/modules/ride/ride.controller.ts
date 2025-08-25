
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
  const { pickupLocation, destination, pickupTime } = req.body;
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

// ✅ Estimate fare controller
export const estimateFare = async (req: Request, res: Response) => {
  const { pickup, destination } = req.query;
  if (!pickup || !destination) {
    return res.status(400).json({ message: 'Pickup and destination required' });
  }

  const result = await RideService.estimateFare(
    pickup.toString(),
    destination.toString()
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fare estimated successfully',
    data: result,
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


















// import { Request, Response } from 'express';
// import * as RideService from './ride.service';
// import sendResponse from '../../utils/sendResponse';

// export const getAllRides = async (req: Request, res: Response) => {
//   const rides = await RideService.getAllRides();
//   sendResponse(res, { statusCode: 200, success: true, message: 'All rides fetched', data: rides });
// };

// export const getRideById = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const ride = await RideService.getRideById(id);
//   sendResponse(res, { statusCode: 200, success: true, message: 'Ride fetched', data: ride });
// };

// export const requestRide = async (req: Request, res: Response) => {
//   const { pickupLocation, destination, pickupTime } = req.body;
//   const riderId = req.user?.userId!;
//   const ride = await RideService.requestRide(riderId, pickupLocation, destination, pickupTime);
//   sendResponse(res, { statusCode: 201, success: true, message: 'Ride requested', data: ride });
// };

// export const cancelRide = async (req: Request, res: Response) => {
//   const rideId = req.params.id;
//   const userId = req.user?.userId!;
//   const ride = await RideService.cancelRide(rideId, userId);
//   sendResponse(res, { statusCode: 200, success: true, message: 'Ride cancelled', data: ride });
// };

// export const estimateFare = async (req: Request, res: Response) => {
//   const { pickup, destination } = req.query;
//   if (!pickup || !destination) return res.status(400).json({ message: 'Pickup & destination required' });
//   const result = await RideService.estimateFare(pickup.toString(), destination.toString());
//   sendResponse(res, { statusCode: 200, success: true, message: 'Fare estimated', data: result });
// };

// export const updateStatus = async (req: Request, res: Response) => {
//   const rideId = req.params.id;
//   const { status } = req.body;
//   const driverId = req.user?.userId!;
//   const ride = await RideService.updateRideStatus(rideId, driverId, status);
//   sendResponse(res, { statusCode: 200, success: true, message: `Ride status updated to ${status}`, data: ride });
// };

// export const rideHistory = async (req: Request, res: Response) => {
//   const userId = req.user?.userId!;
//   const role = req.user?.role!;
//   const history = await RideService.getRideHistory(userId, role);
//   sendResponse(res, { statusCode: 200, success: true, message: 'Ride history fetched', data: history });
// };



























// // src/modules/ride/ride.controller.ts
// import { Request, Response } from 'express'
// import * as RideService from './ride.service'
// import sendResponse from '../../utils/sendResponse'

// export const getAllRides = async (req: Request, res: Response) => {
//   const rides = await RideService.getAllRides()
//   sendResponse(res, { statusCode: 200, success: true, message: 'All rides fetched', data: rides })
// }

// export const getRideById = async (req: Request, res: Response) => {
//   const { id } = req.params
//   const ride = await RideService.getRideById(id)
//   sendResponse(res, { statusCode: 200, success: true, message: 'Ride fetched', data: ride })
// }

// export const requestRide = async (req: Request, res: Response) => {
//   const { pickupLocation, destination, pickupTime } = req.body
//   const riderId = req.user?.userId!
//   const ride = await RideService.requestRide(riderId, pickupLocation, destination, pickupTime)
//   sendResponse(res, { statusCode: 201, success: true, message: 'Ride requested', data: ride })
// }

// export const cancelRide = async (req: Request, res: Response) => {
//   const rideId = req.params.id
//   const userId = req.user?.userId!
//   const ride = await RideService.cancelRide(rideId, userId)
//   sendResponse(res, { statusCode: 200, success: true, message: 'Ride cancelled', data: ride })
// }

// export const estimateFare = async (req: Request, res: Response) => {
//   const { pickup, destination } = req.query
//   if (!pickup || !destination)
//     return res.status(400).json({ message: 'Pickup & destination required' })
//   const result = await RideService.estimateFare(pickup.toString(), destination.toString())
//   sendResponse(res, { statusCode: 200, success: true, message: 'Fare estimated', data: result })
// }

// export const updateStatus = async (req: Request, res: Response) => {
//   const rideId = req.params.id
//   const { status } = req.body
//   const driverId = req.user?.userId!
//   const ride = await RideService.updateRideStatus(rideId, driverId, status)
//   sendResponse(res, { statusCode: 200, success: true, message: `Ride status updated to ${status}`, data: ride })
// }

// export const rideHistory = async (req: Request, res: Response) => {
//   const userId = req.user?.userId!
//   const role = req.user?.role!
//   const history = await RideService.getRideHistory(userId, role)
//   sendResponse(res, { statusCode: 200, success: true, message: 'Ride history fetched', data: history })
// }
