
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

// app.use(cors());



app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://ride-frontend-one.vercel.app'],
    credentials: true,
   }),
   
);

app.get('/', (req, res) => res.send('Ride Booking API is running!'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/driver', driverRoutes); // driver routes
app.use('/api/v1/rides', rideRoutes);
app.use('/api/v1/admin', adminRoutes);

// Error middleware
app.use(errorMiddleware);

export default app;







// halka worked kore
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

// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://ride-frontend-one.vercel.app'
// ];

// // CORS setup
// const corsOptions: cors.CorsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, origin); // allow specific origin
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// };

// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

// app.use(express.json());
// app.use(cookieParser());

// app.get('/', (req, res) => res.send('Ride Booking API is running!'));

// // Routes
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/driver', driverRoutes);
// app.use('/api/v1/rides', rideRoutes);
// app.use('/api/v1/admin', adminRoutes);

// // Error middleware
// app.use(errorMiddleware);

// export default app;
