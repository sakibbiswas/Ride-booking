import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './modules/auth/auth.route';
import userRoutes from './modules/user/user.route';
import driverRoutes from './modules/driver/driver.routes';
import rideRoutes from './modules/ride/ride.route';
import errorMiddleware from './middlewares/error.middleware';
import adminRoutes from './modules/user/admin.route';



const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Test GET route
app.get('/', (req, res) => {
  res.send('🚗 Ride Booking API is running!');
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/driver', driverRoutes);
app.use('/api/v1/rides', rideRoutes);
app.use('/api/v1/admin', adminRoutes);

// Error handling middleware
app.use(errorMiddleware);

export default app;
