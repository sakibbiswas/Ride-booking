"use strict";
// import express from 'express';
// import {
//   getAllRides,
//   requestRide,
//   cancelRide,
//   updateStatus,
//   rideHistory,
// } from './ride.controller';
// import authMiddleware from '../../middlewares/auth.middleware';
// import { UserRole } from '../user/user.model';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// router.get('/', getAllRides); // Public GET all rides
// router.post('/', authMiddleware(UserRole.RIDER), requestRide);
// router.patch('/cancel/:id', authMiddleware(UserRole.RIDER), cancelRide);
// router.get('/me', authMiddleware(UserRole.RIDER, UserRole.DRIVER), rideHistory);
// router.patch('/:id/status', authMiddleware(UserRole.DRIVER), updateStatus);
// export default router;
const express_1 = __importDefault(require("express"));
const ride_controller_1 = require("./ride.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const user_model_1 = require("../user/user.model");
const router = express_1.default.Router();
// Public - anyone can get all rides
router.get('/', ride_controller_1.getAllRides);
// Only riders can request and cancel a ride
router.post('/', (0, auth_middleware_1.default)(user_model_1.UserRole.RIDER), ride_controller_1.requestRide);
router.patch('/cancel/:id', (0, auth_middleware_1.default)(user_model_1.UserRole.RIDER), ride_controller_1.cancelRide);
// Both riders and drivers can view their ride history
router.get('/me', (0, auth_middleware_1.default)(user_model_1.UserRole.RIDER, user_model_1.UserRole.DRIVER), ride_controller_1.rideHistory);
// Only drivers can update ride status
router.patch('/:id/status', (0, auth_middleware_1.default)(user_model_1.UserRole.DRIVER), ride_controller_1.updateStatus);
exports.default = router;
