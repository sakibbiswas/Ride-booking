"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const driver_routes_1 = __importDefault(require("./modules/driver/driver.routes"));
const ride_route_1 = __importDefault(require("./modules/ride/ride.route"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const admin_route_1 = __importDefault(require("./modules/user/admin.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Test GET route
app.get('/', (req, res) => {
    res.send('🚗 Ride Booking API is running!');
});
// Routes
app.use('/api/v1/auth', auth_route_1.default);
app.use('/api/v1/users', user_route_1.default);
app.use('/api/v1/driver', driver_routes_1.default);
app.use('/api/v1/rides', ride_route_1.default);
app.use('/api/v1/admin', admin_route_1.default);
// Error handling middleware
app.use(error_middleware_1.default);
exports.default = app;
