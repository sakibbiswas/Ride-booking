import { Response } from 'express';

const sendResponse = <T>(
  res: Response,
  {
    statusCode,
    success,
    message,
    data,
  }: {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
  }
) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export default sendResponse;
