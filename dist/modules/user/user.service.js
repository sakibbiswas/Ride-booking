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
exports.setOnlineStatus = exports.suspendDriver = exports.approveDriver = exports.unblockUser = exports.blockUser = exports.updateEmergencyContacts = exports.updatePassword = exports.updateProfile = exports.getUserById = exports.getAllUsers = void 0;
const user_model_1 = require("./user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.find();
});
exports.getAllUsers = getAllUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        return null;
    return yield user_model_1.User.findById(id).lean();
});
exports.getUserById = getUserById;
// ✅ Update Profile (Admin, Rider, Driver)
const updateProfile = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const allowed = {};
    if (data.name)
        allowed.name = data.name;
    if (data.email)
        allowed.email = data.email;
    return yield user_model_1.User.findByIdAndUpdate(id, allowed, { new: true }).lean();
});
exports.updateProfile = updateProfile;
// ✅ Update Password
const updatePassword = (id, currentPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user)
        throw new Error('User not found');
    const isMatch = yield bcryptjs_1.default.compare(currentPassword, user.password);
    if (!isMatch)
        throw new Error('Current password is incorrect');
    user.password = yield bcryptjs_1.default.hash(newPassword, 10);
    yield user.save();
    return true;
});
exports.updatePassword = updatePassword;
// ✅ Update Emergency Contacts (not for admin, but available)
const updateEmergencyContacts = (id, contacts) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findByIdAndUpdate(id, { emergencyContacts: contacts }, { new: true, runValidators: true }).lean();
});
exports.updateEmergencyContacts = updateEmergencyContacts;
// ✅ Block User
const blockUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
});
exports.blockUser = blockUser;
// ✅ Unblock User
const unblockUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findByIdAndUpdate(id, { isBlocked: false }, { new: true });
});
exports.unblockUser = unblockUser;
// ✅ Approve Driver
const approveDriver = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findByIdAndUpdate(id, { isApproved: true }, { new: true });
});
exports.approveDriver = approveDriver;
// ✅ Suspend Driver
const suspendDriver = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findByIdAndUpdate(id, { isApproved: false }, { new: true });
});
exports.suspendDriver = suspendDriver;
// ✅ Set Online/Offline
const setOnlineStatus = (userId, isOnline) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user)
        throw new Error('User not found');
    if (typeof isOnline === 'boolean') {
        user.isOnline = isOnline;
    }
    else {
        user.isOnline = !user.isOnline;
    }
    yield user.save();
    return user;
});
exports.setOnlineStatus = setOnlineStatus;
