"use strict";
// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import authRoutes from './modules/auth/auth.route';
// import userRoutes from './modules/user/user.route';
// import driverRoutes from './modules/driver/driver.routes';
// import rideRoutes from './modules/ride/ride.route';
// import adminRoutes from './modules/user/admin.route';
// import errorMiddleware from './middlewares/error.middleware';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());
// app.get('/', (req, res) => res.send('Ride Booking API is running!'));
// // Routes
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/driver', driverRoutes); // driver routes
// app.use('/api/v1/rides', rideRoutes);
// app.use('/api/v1/admin', adminRoutes);
// // Error middleware
// app.use(errorMiddleware);
// export default app;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const driver_routes_1 = __importDefault(require("./modules/driver/driver.routes"));
const ride_route_1 = __importDefault(require("./modules/ride/ride.route"));
const admin_route_1 = __importDefault(require("./modules/user/admin.route"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
// CORS setup
app.use((0, cors_1.default)({
    origin: config_1.default.frontend_url,
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => res.send('Ride Booking API is running!'));
// Routes
app.use('/api/v1/auth', auth_route_1.default);
app.use('/api/v1/users', user_route_1.default);
app.use('/api/v1/driver', driver_routes_1.default);
app.use('/api/v1/rides', ride_route_1.default);
app.use('/api/v1/admin', admin_route_1.default);
// Error middleware
app.use(error_middleware_1.default);
exports.default = app;
