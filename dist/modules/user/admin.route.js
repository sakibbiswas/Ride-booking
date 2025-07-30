"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const user_model_1 = require("../user/user.model"); // path adjust করো
const router = express_1.default.Router();
router.patch('/approve-driver/:driverId', (0, auth_middleware_1.default)(user_model_1.UserRole.ADMIN), admin_controller_1.approveDriver);
router.patch('/suspend-driver/:driverId', (0, auth_middleware_1.default)(user_model_1.UserRole.ADMIN), admin_controller_1.suspendDriver);
router.get('/system-stats', (0, auth_middleware_1.default)(user_model_1.UserRole.ADMIN), admin_controller_1.viewSystemStats);
exports.default = router;
