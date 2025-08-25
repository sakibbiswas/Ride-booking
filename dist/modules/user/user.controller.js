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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.suspendDriver = exports.approveDriver = exports.unblockUser = exports.blockUser = exports.setOnlineStatus = exports.updateMyEmergencyContacts = exports.updateMyPassword = exports.updateMyProfile = exports.getMyProfile = exports.getAllUsers = void 0;
const UserService = __importStar(require("./user.service"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
// ✅ GET /users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserService.getAllUsers();
    // Remove passwords from all users before sending
    const safeUsers = users.map((user) => {
        const _a = user.toObject ? user.toObject() : user, { password } = _a, rest = __rest(_a, ["password"]);
        return rest;
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'All users fetched successfully',
        data: safeUsers,
    });
});
exports.getAllUsers = getAllUsers;
// ✅ GET /users/me
const getMyProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId)
        return res.status(401).json({ message: 'Unauthorized' });
    const user = yield UserService.getUserById(userId);
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    // Remove password field
    const _b = user, { password } = _b, safeUser = __rest(_b, ["password"]);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User profile fetched successfully',
        data: safeUser,
    });
});
exports.getMyProfile = getMyProfile;
// ✅ PATCH /users/me
const updateMyProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId)
        return res.status(401).json({ message: 'Unauthorized' });
    const updated = yield UserService.updateProfile(userId, req.body);
    // Remove password field
    const _b = updated, { password } = _b, safeUser = __rest(_b, ["password"]);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Profile updated successfully',
        data: safeUser,
    });
});
exports.updateMyProfile = updateMyProfile;
// ✅ PATCH /users/password
const updateMyPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const { currentPassword, newPassword } = req.body;
    try {
        yield UserService.updatePassword(userId, currentPassword, newPassword);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: 'Password updated successfully',
            data: null,
        });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.updateMyPassword = updateMyPassword;
// ✅ PATCH /users/emergency-contacts
const updateMyEmergencyContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const { emergencyContacts } = req.body;
    if (!Array.isArray(emergencyContacts)) {
        return res.status(400).json({ message: 'emergencyContacts must be an array' });
    }
    const updated = yield UserService.updateEmergencyContacts(userId, emergencyContacts);
    // Remove password field
    const _b = updated, { password } = _b, safeUser = __rest(_b, ["password"]);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Emergency contacts updated successfully',
        data: safeUser,
    });
});
exports.updateMyEmergencyContacts = updateMyEmergencyContacts;
// ✅ PATCH /users/online-status
const setOnlineStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId)
        return res.status(401).json({ message: 'Unauthorized' });
    const { isOnline } = req.body;
    const updated = yield UserService.setOnlineStatus(userId, isOnline);
    // Remove password field
    const _b = updated, { password } = _b, safeUser = __rest(_b, ["password"]);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Online status updated',
        data: safeUser,
    });
});
exports.setOnlineStatus = setOnlineStatus;
// ✅ PATCH /users/block/:id
const blockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield UserService.blockUser(id);
    const _a = user, { password } = _a, safeUser = __rest(_a, ["password"]);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User blocked successfully',
        data: safeUser,
    });
});
exports.blockUser = blockUser;
// ✅ PATCH /users/unblock/:id
const unblockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield UserService.unblockUser(id);
    const _a = user, { password } = _a, safeUser = __rest(_a, ["password"]);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User unblocked successfully',
        data: safeUser,
    });
});
exports.unblockUser = unblockUser;
// ✅ PATCH /users/approve/:id
const approveDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const driver = yield UserService.approveDriver(id);
    const _a = driver, { password } = _a, safeDriver = __rest(_a, ["password"]);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Driver approved successfully',
        data: safeDriver,
    });
});
exports.approveDriver = approveDriver;
// ✅ PATCH /users/suspend/:id
const suspendDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const driver = yield UserService.suspendDriver(id);
    const _a = driver, { password } = _a, safeDriver = __rest(_a, ["password"]);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Driver suspended successfully',
        data: safeDriver,
    });
});
exports.suspendDriver = suspendDriver;
