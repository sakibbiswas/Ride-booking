"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideHistory = exports.updateStatus = exports.estimateFare = exports.cancelRide = exports.requestRide = exports.getAllRides = void 0;
const RideService = __importStar(require("./ride.service"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const getAllRides = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield RideService.getAllRides();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'All rides fetched successfully',
        data: rides,
    });
});
exports.getAllRides = getAllRides;
const requestRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { pickupLocation, destination, pickupTime } = req.body;
    const riderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const ride = yield RideService.requestRide(riderId, pickupLocation, destination, pickupTime);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Ride requested successfully',
        data: ride,
    });
});
exports.requestRide = requestRide;
const cancelRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const rideId = req.params.id;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const ride = yield RideService.cancelRide(rideId, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Ride cancelled successfully',
        data: ride,
    });
});
exports.cancelRide = cancelRide;
// ✅ Estimate fare controller
const estimateFare = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pickup, destination } = req.query;
    if (!pickup || !destination) {
        return res.status(400).json({ message: 'Pickup and destination required' });
    }
    const result = yield RideService.estimateFare(pickup.toString(), destination.toString());
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Fare estimated successfully',
        data: result,
    });
});
exports.estimateFare = estimateFare;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const rideId = req.params.id;
    const { status } = req.body;
    const driverId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const ride = yield RideService.updateRideStatus(rideId, driverId, status);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Ride status updated to ${status}`,
        data: ride,
    });
});
exports.updateStatus = updateStatus;
const rideHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
    const history = yield RideService.getRideHistory(userId, role);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Ride history fetched successfully',
        data: history,
    });
});
exports.rideHistory = rideHistory;
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
