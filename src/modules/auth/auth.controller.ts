import { Request, Response } from 'express';
import * as AuthService from './auth.service';
import sendResponse from '../../utils/sendResponse';

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
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: result,
  });
};
