import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import config from '../config';

// Ensure the secret is treated as a proper JWT secret
const JWT_SECRET: Secret = config.jwt_secret || 'default_jwt_secret';

// Generate JWT Token
export const signToken = (
  payload: string | object | Buffer,
  expiresIn: SignOptions['expiresIn'] = '7d' //  correct typing for "7d"
): string => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
};

// Verify JWT Token
export const verifyToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, JWT_SECRET);
};
