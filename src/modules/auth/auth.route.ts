


// src/modules/auth/auth.route.ts
import express from 'express';
import { register, login, logout } from './auth.controller';
import authMiddleware from '../../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware(), logout); 
export default router;
