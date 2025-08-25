
// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import authRoutes from './modules/auth/auth.route';
// import userRoutes from './modules/user/user.route';
// import driverRoutes from './modules/driver/driver.routes';
// import rideRoutes from './modules/ride/ride.route';
// import adminRoutes from './modules/user/admin.route';
// import errorMiddleware from './middlewares/error.middleware';

// const app = express();

// // // app.use(cors());
// app.use(
//   cors({
//     origin: ['http://localhost:5173', 'https://ride-frontend-d47qs5m46-sakibbiswas-projects.vercel.app']
//    })
// );


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













import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './modules/auth/auth.route';
import userRoutes from './modules/user/user.route';
import driverRoutes from './modules/driver/driver.routes';
import rideRoutes from './modules/ride/ride.route';
import adminRoutes from './modules/user/admin.route';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

// ✅ CORS config
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://ride-frontend-d47qs5m46-sakibbiswas-projects.vercel.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(cookieParser());

// Health check
app.get('/', (req, res) => res.send('Ride Booking API is running!'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/driver', driverRoutes);
app.use('/api/v1/rides', rideRoutes);
app.use('/api/v1/admin', adminRoutes);

// Error middleware
app.use(errorMiddleware);

export default app;

