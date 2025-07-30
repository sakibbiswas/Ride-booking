import { User } from './user.model';

export const getAllUsers = async () => {
  return await User.find();
};

export const getUserById = async (id: string) => {
  return await User.findById(id);
};

export const blockUser = async (id: string) => {
  return await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
};

export const unblockUser = async (id: string) => {
  return await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true });
};

export const approveDriver = async (id: string) => {
  return await User.findByIdAndUpdate(id, { isApproved: true }, { new: true });
};

export const suspendDriver = async (id: string) => {
  return await User.findByIdAndUpdate(id, { isApproved: false }, { new: true });
};
