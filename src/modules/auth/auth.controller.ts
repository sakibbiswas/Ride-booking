
// src/modules/auth/auth.controller.ts
import { Request, Response } from 'express';
import * as AuthService from './auth.service';
import sendResponse from '../../utils/sendResponse';
import { User, UserRole } from '../user/user.model';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const user = await AuthService.registerUser(name, email, password, role);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: user,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await AuthService.loginUser(email, password);

  //  Driver হলে login এর সাথে isOnline update
  if (result.user.role === UserRole.DRIVER) {
    await User.findByIdAndUpdate(result.user._id, { isOnline: true });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: result,
  });
};

//  Driver Logout
export const logout = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId; 
    if (!userId) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: 'Unauthorized',
      });
    }

    //  Driver isOnline false 
    const user = await User.findById(userId);
    if (user?.role === UserRole.DRIVER) {
      await User.findByIdAndUpdate(userId, { isOnline: false });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Logout successful',
    });
  } catch (err) {
    console.error(err);
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: 'Server error',
    });
  }
};
























