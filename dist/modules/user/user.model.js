"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
const mongoose_1 = require("mongoose");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["RIDER"] = "rider";
    UserRole["DRIVER"] = "driver";
})(UserRole || (exports.UserRole = UserRole = {}));
const emergencyContactSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
}, { _id: false } // prevent generating _id for each contact
);
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.RIDER,
    },
    isBlocked: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    isOnline: { type: Boolean, default: false },
    emergencyContacts: [emergencyContactSchema], // ✅ nested object array
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
