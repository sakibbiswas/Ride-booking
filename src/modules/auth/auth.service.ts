
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserRole } from '../user/user.model';
import config from '../../config';

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: UserRole
) => {
  const normalizedEmail = email.toLowerCase(); 

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const isApproved = role === UserRole.DRIVER ? false : true;

  const user = new User({
    name,
    email: normalizedEmail,
    password: hashedPassword,
    role,
    isApproved,
  });

  await user.save();
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const normalizedEmail = email.toLowerCase(); // normalize

  const user = await User.findOne({ email: normalizedEmail });

  if (!user) throw new Error('User not found');
  if (user.isBlocked) throw new Error('User is blocked');
  if (user.role === UserRole.DRIVER && !user.isApproved) {
    throw new Error('Driver is not approved yet');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { userId: user._id.toString(), role: user.role },
    config.jwt_secret as string,
    { expiresIn: '7d' }
  );

  return { token, user };
};

