"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
// Ensure the secret is treated as a proper JWT secret
const JWT_SECRET = config_1.default.jwt_secret || 'default_jwt_secret';
// Generate JWT Token
const signToken = (payload, expiresIn = '7d' //  correct typing for "7d"
) => {
    const options = { expiresIn };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, options);
};
exports.signToken = signToken;
// Verify JWT Token
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
};
exports.verifyToken = verifyToken;
