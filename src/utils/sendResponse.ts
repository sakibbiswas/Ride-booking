
// src/utils/sendResponse.ts
import { Response } from 'express';

interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T | null; 
}

const sendResponse = <T>(
  res: Response,
  { statusCode, success, message, data = null }: IResponse<T>
) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export default sendResponse;
