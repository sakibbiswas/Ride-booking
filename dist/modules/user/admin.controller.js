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
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewSystemStats = exports.suspendDriver = exports.approveDriver = void 0;
const user_model_1 = require("../user/user.model");
const user_model_2 = require("../user/user.model");
const approveDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { driverId } = req.params;
    //  Update driver in the User collection
    const updated = yield user_model_1.User.findOneAndUpdate({ _id: driverId, role: user_model_2.UserRole.DRIVER }, { isApproved: true }, { new: true });
    if (!updated) {
        return res.status(404).json({ message: 'Driver not found' });
    }
    res.json({
        message: 'Driver approved successfully',
        driver: updated,
    });
});
exports.approveDriver = approveDriver;
const suspendDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { driverId } = req.params;
    const updated = yield user_model_1.User.findOneAndUpdate({ _id: driverId, role: user_model_2.UserRole.DRIVER }, { isBlocked: true }, { new: true });
    if (!updated) {
        return res.status(404).json({ message: 'Driver not found' });
    }
    res.json({
        message: 'Driver suspended successfully',
        driver: updated,
    });
});
exports.suspendDriver = suspendDriver;
const viewSystemStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const totalDrivers = yield user_model_1.User.countDocuments({ role: user_model_2.UserRole.DRIVER });
    const approvedDrivers = yield user_model_1.User.countDocuments({
        role: user_model_2.UserRole.DRIVER,
        isApproved: true,
    });
    const onlineDrivers = yield user_model_1.User.countDocuments({
        role: user_model_2.UserRole.DRIVER,
        isOnline: true,
    });
    res.json({
        totalDrivers,
        approvedDrivers,
        onlineDrivers,
    });
});
exports.viewSystemStats = viewSystemStats;
