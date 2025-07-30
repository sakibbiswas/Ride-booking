
import { Request, Response } from 'express';
import * as UserService from './user.service';
import sendResponse from '../../utils/sendResponse';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All users fetched successfully',
    data: users,
  });
};

export const getMyProfile = async (req: Request, res: Response) => {
  const user = req.user;
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User profile fetched successfully',
    data: user,
  });
};

export const blockUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.blockUser(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User blocked successfully',
    data: user,
  });
};

export const unblockUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.unblockUser(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User unblocked successfully',
    data: user,
  });
};

export const approveDriver = async (req: Request, res: Response) => {
  const { id } = req.params;
  const driver = await UserService.approveDriver(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Driver approved successfully',
    data: driver,
  });
};

export const suspendDriver = async (req: Request, res: Response) => {
  const { id } = req.params;
  const driver = await UserService.suspendDriver(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Driver suspended successfully',
    data: driver,
  });
};
