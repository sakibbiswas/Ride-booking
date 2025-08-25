
import { Request, Response } from 'express';
import * as UserService from './user.service';
import sendResponse from '../../utils/sendResponse';

// ✅ GET /users
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();

  // Remove passwords from all users before sending
  const safeUsers = users.map((user: any) => {
    const { password, ...rest } = user.toObject ? user.toObject() : user;
    return rest;
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All users fetched successfully',
    data: safeUsers,
  });
};

// ✅ GET /users/me
export const getMyProfile = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const user = await UserService.getUserById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Remove password field
  const { password, ...safeUser } = user as any;

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User profile fetched successfully',
    data: safeUser,
  });
};

// ✅ PATCH /users/me
export const updateMyProfile = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const updated = await UserService.updateProfile(userId, req.body);

  // Remove password field
  const { password, ...safeUser } = updated as any;

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile updated successfully',
    data: safeUser,
  });
};

// ✅ PATCH /users/password
export const updateMyPassword = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { currentPassword, newPassword } = req.body;

  try {
    await UserService.updatePassword(userId!, currentPassword, newPassword);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Password updated successfully',
      data: null,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ PATCH /users/emergency-contacts
export const updateMyEmergencyContacts = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { emergencyContacts } = req.body;

  if (!Array.isArray(emergencyContacts)) {
    return res.status(400).json({ message: 'emergencyContacts must be an array' });
  }

  const updated = await UserService.updateEmergencyContacts(userId!, emergencyContacts);

  // Remove password field
  const { password, ...safeUser } = updated as any;

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Emergency contacts updated successfully',
    data: safeUser,
  });
};

// ✅ PATCH /users/online-status
export const setOnlineStatus = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const { isOnline } = req.body;
  const updated = await UserService.setOnlineStatus(userId, isOnline);

  // Remove password field
  const { password, ...safeUser } = updated as any;

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Online status updated',
    data: safeUser,
  });
};

// ✅ PATCH /users/block/:id
export const blockUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.blockUser(id);

  const { password, ...safeUser } = user as any;

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User blocked successfully',
    data: safeUser,
  });
};

// ✅ PATCH /users/unblock/:id
export const unblockUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.unblockUser(id);

  const { password, ...safeUser } = user as any;

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User unblocked successfully',
    data: safeUser,
  });
};

// ✅ PATCH /users/approve/:id
export const approveDriver = async (req: Request, res: Response) => {
  const { id } = req.params;
  const driver = await UserService.approveDriver(id);

  const { password, ...safeDriver } = driver as any;

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Driver approved successfully',
    data: safeDriver,
  });
};

// ✅ PATCH /users/suspend/:id
export const suspendDriver = async (req: Request, res: Response) => {
  const { id } = req.params;
  const driver = await UserService.suspendDriver(id);

  const { password, ...safeDriver } = driver as any;

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Driver suspended successfully',
    data: safeDriver,
  });
};
