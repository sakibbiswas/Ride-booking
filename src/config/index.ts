import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  mongo_uri: process.env.MONGO_URI,
jwt_secret: process.env.JWT_SECRET || 'secret123'
};




// import dotenv from 'dotenv';
// dotenv.config();

// const config = {
//   port: process.env.PORT || 5000, // Local use only
//   mongo_uri: process.env.MONGO_URI as string,
//   jwt_secret: process.env.JWT_SECRET || 'secret123',

//   env: process.env.NODE_ENV || 'development',
// };

// export default config;
