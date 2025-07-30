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
exports.getDriverEarnings = exports.updateRideStatus = exports.acceptRide = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ride_model_1 = require("../ride/ride.model");
const rideService = __importStar(require("../ride/ride.service"));
const acceptRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.status(401).json({ message: 'Unauthorized' });
    const { rideId } = req.params;
    const driverId = req.user.userId;
    try {
        const id = rideId.trim();
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ride ID' });
        }
        const ride = yield rideService.updateRideStatus(id, driverId, ride_model_1.RideStatus.ACCEPTED);
        res.status(200).json(ride);
    }
    catch (err) {
        console.error('Accept ride error:', err);
        res.status(500).json({ message: 'Error accepting ride', error: err });
    }
});
exports.acceptRide = acceptRide;
const updateRideStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.status(401).json({ message: 'Unauthorized' });
    const { rideId } = req.params;
    const { status } = req.body;
    const driverId = req.user.userId;
    if (!Object.values(ride_model_1.RideStatus).includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }
    try {
        const id = rideId.trim();
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ride ID' });
        }
        const ride = yield rideService.updateRideStatus(id, driverId, status);
        res.status(200).json(ride);
    }
    catch (err) {
        console.error('Update ride status error:', err);
        res.status(500).json({ message: 'Error updating ride status', error: err });
    }
});
exports.updateRideStatus = updateRideStatus;
const getDriverEarnings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.status(401).json({ message: 'Unauthorized' });
    const driverId = req.user.userId;
    try {
        const rides = yield rideService.getRideHistory(driverId, 'driver');
        const completedRides = rides.filter(r => r.status === ride_model_1.RideStatus.COMPLETED);
        const totalEarnings = completedRides.reduce((sum, ride) => sum + (ride.fare || 0), 0);
        res.status(200).json({ totalEarnings, rideCount: completedRides.length });
    }
    catch (err) {
        console.error('Earnings error:', err);
        res.status(500).json({ message: 'Error fetching earnings', error: err });
    }
});
exports.getDriverEarnings = getDriverEarnings;
