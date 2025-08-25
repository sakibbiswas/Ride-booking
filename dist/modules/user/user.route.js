"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const user_model_1 = require("./user.model");
const router = express_1.default.Router();
// ✅ Authenticated user routes
router.get('/me', (0, auth_middleware_1.default)(), user_controller_1.getMyProfile);
router.patch('/me', (0, auth_middleware_1.default)(), user_controller_1.updateMyProfile);
router.patch('/password', (0, auth_middleware_1.default)(), user_controller_1.updateMyPassword);
router.patch('/emergency-contacts', (0, auth_middleware_1.default)(), user_controller_1.updateMyEmergencyContacts);
router.patch('/me/online', (0, auth_middleware_1.default)(), user_controller_1.setOnlineStatus);
// ✅ Admin-only
router.get('/', (0, auth_middleware_1.default)(user_model_1.UserRole.ADMIN), user_controller_1.getAllUsers);
router.patch('/block/:id', (0, auth_middleware_1.default)(user_model_1.UserRole.ADMIN), user_controller_1.blockUser);
router.patch('/unblock/:id', (0, auth_middleware_1.default)(user_model_1.UserRole.ADMIN), user_controller_1.unblockUser);
router.patch('/approve/:id', (0, auth_middleware_1.default)(user_model_1.UserRole.ADMIN), user_controller_1.approveDriver);
router.patch('/suspend/:id', (0, auth_middleware_1.default)(user_model_1.UserRole.ADMIN), user_controller_1.suspendDriver);
exports.default = router;
