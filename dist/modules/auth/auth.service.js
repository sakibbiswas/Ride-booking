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
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../user/user.model");
const config_1 = __importDefault(require("../../config"));
const registerUser = (name, email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    const normalizedEmail = email.toLowerCase(); // normalize
    const existingUser = yield user_model_1.User.findOne({ email: normalizedEmail });
    if (existingUser)
        throw new Error('User already exists');
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const isApproved = role === user_model_1.UserRole.DRIVER ? false : true;
    const user = new user_model_1.User({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role,
        isApproved,
    });
    yield user.save();
    return user;
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const normalizedEmail = email.toLowerCase(); // normalize
    const user = yield user_model_1.User.findOne({ email: normalizedEmail });
    if (!user)
        throw new Error('User not found');
    if (user.isBlocked)
        throw new Error('User is blocked');
    if (user.role === user_model_1.UserRole.DRIVER && !user.isApproved) {
        throw new Error('Driver is not approved yet');
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatch)
        throw new Error('Invalid credentials');
    const token = jsonwebtoken_1.default.sign({ userId: user._id.toString(), role: user.role }, config_1.default.jwt_secret, { expiresIn: '7d' });
    return { token, user };
});
exports.loginUser = loginUser;
