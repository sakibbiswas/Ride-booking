// import dotenv from 'dotenv';
// dotenv.config();

// export default {
//   port: process.env.PORT || 5000,
//   mongo_uri: process.env.MONGO_URI,
// jwt_secret: process.env.JWT_SECRET || 'secret123'
// };




import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  mongo_uri: process.env.MONGO_URI,
  jwt_secret: process.env.JWT_SECRET || 'secret123',
  frontend_url: process.env.FRONTEND_URL || 'http://localhost:5173',
};

