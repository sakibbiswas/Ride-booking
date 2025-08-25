import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { User, UserRole } from './modules/user/user.model';
import bcrypt from 'bcryptjs';

const PORT = config.port || 5000;

const createDefaultAdmin = async () => {
  const adminEmail = 'admin@gmail.com';
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = new User({
      name: 'Super Admin',
      email: adminEmail,
      password: hashedPassword,
      role: UserRole.ADMIN,
      isBlocked: false,
      isApproved: true,
    });

    await adminUser.save();
    console.log(' Default admin user created');
  } else {
    console.log(' Admin already exists');
  }
};

const main = async () => {
  try {
    await mongoose.connect(config.mongo_uri as string);
    console.log(' Connected to MongoDB');

    await createDefaultAdmin(); // Auto-create admin if missing

    app.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error(' Failed to start server:', err);
  }
};

main();
























// import mongoose from 'mongoose';
// import app from './app';
// import config from './config';
// import { User, UserRole } from './modules/user/user.model';
// import bcrypt from 'bcryptjs';

// let isConnected = false; // reuse MongoDB connection in serverless

// const createDefaultAdmin = async () => {
//   const adminEmail = 'admin@gmail.com';
//   const existingAdmin = await User.findOne({ email: adminEmail });

//   if (!existingAdmin) {
//     const hashedPassword = await bcrypt.hash('admin123', 10);
//     await new User({
//       name: 'Super Admin',
//       email: adminEmail,
//       password: hashedPassword,
//       role: UserRole.ADMIN,
//       isBlocked: false,
//       isApproved: true,
//     }).save();
//     console.log('✅ Default admin created');
//   } else {
//     console.log('Admin already exists');
//   }
// };

// // ✅ Vercel serverless handler
// export default async function handler(req: any, res: any) {
//   try {
//     // Connect to MongoDB only once
//     if (!isConnected) {
//       await mongoose.connect(config.mongo_uri as string);
//       isConnected = true;
//       console.log('✅ Connected to MongoDB');

//       await createDefaultAdmin();
//     }

//     return app(req, res); // Express app handles request
//   } catch (err) {
//     console.error('❌ Server error:', err);
//     return res.status(500).json({ success: false, message: 'Server error' });
//   }
// }
