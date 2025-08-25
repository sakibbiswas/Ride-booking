"use strict";
// import mongoose from 'mongoose';
// import app from './app';
// import config from './config';
// import { User, UserRole } from './modules/user/user.model';
// import bcrypt from 'bcryptjs';
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
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const driver_routes_1 = __importDefault(require("./modules/driver/driver.routes"));
const ride_route_1 = __importDefault(require("./modules/ride/ride.route"));
const admin_route_1 = __importDefault(require("./modules/user/admin.route"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const app = (0, express_1.default)();
// ✅ Allowed frontend URLs
const allowedOrigins = [
    'https://ride-frontend-one.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
];
// ✅ CORS middleware
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin))
            return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
// ✅ OPTIONS preflight
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.header('Origin') || '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// ✅ Routes
app.use('/api/v1/auth', auth_route_1.default);
app.use('/api/v1/users', user_route_1.default);
app.use('/api/v1/driver', driver_routes_1.default);
app.use('/api/v1/rides', ride_route_1.default);
app.use('/api/v1/admin', admin_route_1.default);
// ✅ Error middleware
app.use(error_middleware_1.default);
// ✅ Connect MongoDB on cold start
let cachedDb = null;
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!cachedDb) {
            cachedDb = yield mongoose_1.default.connect(config_1.default.mongo_uri);
            console.log('✅ Connected to MongoDB');
        }
    });
}
connectDB().catch(console.error);
// ✅ Serverless handler
exports.default = (req, res) => {
    app(req, res);
};
