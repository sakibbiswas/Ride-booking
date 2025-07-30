"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const driver_controller_1 = require("./driver.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const user_model_1 = require("../user/user.model");
const router = express_1.default.Router();
router.post('/accept/:rideId', (0, auth_middleware_1.default)(user_model_1.UserRole.DRIVER), driver_controller_1.acceptRide);
router.patch('/update-status/:rideId', (0, auth_middleware_1.default)(user_model_1.UserRole.DRIVER), driver_controller_1.updateRideStatus);
router.get('/earnings', (0, auth_middleware_1.default)(user_model_1.UserRole.DRIVER), driver_controller_1.getDriverEarnings);
exports.default = router;
