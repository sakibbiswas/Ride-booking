"use strict";
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
exports.getRideHistory = exports.updateRideStatus = exports.cancelRide = exports.requestRide = exports.getAllRides = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ride_model_1 = require("./ride.model");
const getAllRides = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ride_model_1.Ride.find();
});
exports.getAllRides = getAllRides;
const requestRide = (riderId, pickupLocation, destination, pickupTime) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ride_model_1.Ride.create({
        riderId: new mongoose_1.default.Types.ObjectId(riderId),
        pickupLocation,
        destination,
        pickupTime,
        status: ride_model_1.RideStatus.REQUESTED,
        timestamps: { requestedAt: new Date() },
    });
});
exports.requestRide = requestRide;
const cancelRide = (rideId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride)
        throw new Error('Ride not found');
    if (ride.riderId.toString() !== userId)
        throw new Error('Not authorized');
    if (ride.status !== ride_model_1.RideStatus.REQUESTED)
        throw new Error('Cannot cancel ride');
    ride.status = ride_model_1.RideStatus.CANCELLED;
    ride.timestamps.cancelledAt = new Date();
    return yield ride.save();
});
exports.cancelRide = cancelRide;
const updateRideStatus = (rideId, driverId, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride)
        throw new Error('Ride not found');
    const driverObjectId = new mongoose_1.default.Types.ObjectId(driverId);
    if (ride.driverId && ride.driverId.toString() !== driverId) {
        throw new Error('You are not assigned to this ride');
    }
    if (!ride.driverId)
        ride.driverId = driverObjectId;
    switch (newStatus) {
        case ride_model_1.RideStatus.ACCEPTED:
            ride.timestamps.acceptedAt = new Date();
            break;
        case ride_model_1.RideStatus.PICKED_UP:
            ride.timestamps.pickedUpAt = new Date();
            break;
        case ride_model_1.RideStatus.COMPLETED:
            ride.timestamps.completedAt = new Date();
            ride.fare = calculateFare();
            break;
    }
    ride.status = newStatus;
    return yield ride.save();
});
exports.updateRideStatus = updateRideStatus;
const getRideHistory = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
    const query = role === 'rider' ? { riderId: userObjectId } : { driverId: userObjectId };
    return yield ride_model_1.Ride.find(query).sort({ createdAt: -1 });
});
exports.getRideHistory = getRideHistory;
const calculateFare = () => Math.floor(Math.random() * 300 + 150);
