
import { User } from './user.model';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export const getAllUsers = async () => {
  return await User.find();
};

export const getUserById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await User.findById(id).lean();
};

// ✅ Update Profile (Admin, Rider, Driver)
export const updateProfile = async (
  id: string,
  data: Partial<{ name: string; email: string }>
) => {
  const allowed: any = {};
  if (data.name) allowed.name = data.name;
  if (data.email) allowed.email = data.email;

  return await User.findByIdAndUpdate(id, allowed, { new: true }).lean();
};

// ✅ Update Password
export const updatePassword = async (
  id: string,
  currentPassword: string,
  newPassword: string
) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new Error('Current password is incorrect');

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return true;
};

// ✅ Update Emergency Contacts (not for admin, but available)
export const updateEmergencyContacts = async (
  id: string,
  contacts: { name: string; phone: string }[]
) => {
  return await User.findByIdAndUpdate(
    id,
    { emergencyContacts: contacts },
    { new: true, runValidators: true }
  ).lean();
};

// ✅ Block User
export const blockUser = async (id: string) => {
  return await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
};

// ✅ Unblock User
export const unblockUser = async (id: string) => {
  return await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true });
};

// ✅ Approve Driver
export const approveDriver = async (id: string) => {
  return await User.findByIdAndUpdate(id, { isApproved: true }, { new: true });
};

// ✅ Suspend Driver
export const suspendDriver = async (id: string) => {
  return await User.findByIdAndUpdate(id, { isApproved: false }, { new: true });
};

// ✅ Set Online/Offline
export const setOnlineStatus = async (userId: string, isOnline?: boolean) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (typeof isOnline === 'boolean') {
    user.isOnline = isOnline;
  } else {
    user.isOnline = !user.isOnline;
  }

  await user.save();
  return user;
};
