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
const express_1 = __importDefault(require("express"));
const ride_controller_1 = require("./ride.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const user_model_1 = require("../user/user.model");
const driver_model_1 = require("../driver/driver.model");
const router = express_1.default.Router();
router.get('/', ride_controller_1.getAllRides);
// ✅ Estimate fare (no auth, Rider just checks fare)
router.get('/estimate', ride_controller_1.estimateFare);
// Rider actions
router.post('/', (0, auth_middleware_1.default)(user_model_1.UserRole.RIDER), ride_controller_1.requestRide);
router.patch('/cancel/:id', (0, auth_middleware_1.default)(user_model_1.UserRole.RIDER), ride_controller_1.cancelRide);
// Rider/Driver ride history
router.get('/me', (0, auth_middleware_1.default)(user_model_1.UserRole.RIDER, user_model_1.UserRole.DRIVER), ride_controller_1.rideHistory);
// Driver actions
router.patch('/:id/status', (0, auth_middleware_1.default)(user_model_1.UserRole.DRIVER), ride_controller_1.updateStatus);
// ✅ New route: online drivers count for Rider
router.get('/online-drivers', (0, auth_middleware_1.default)(user_model_1.UserRole.RIDER), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const onlineDrivers = yield driver_model_1.Driver.countDocuments({ isOnline: true });
        res.json({ success: true, onlineDrivers });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
}));
exports.default = router;
