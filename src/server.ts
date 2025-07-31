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

