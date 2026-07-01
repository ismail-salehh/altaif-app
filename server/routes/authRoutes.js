import express from 'express';
import { forgotPassword, getMe, login, logout, resetPassword, signup, googleAuth } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { validateSignup, validateLogin } from '../middleware/validate.js';

const router = express.Router();

router.get('/me', protect, getMe);

router.post('/signup',          authLimiter, validateSignup, signup);
router.post('/login',           authLimiter, validateLogin,  login);
router.post('/google',          authLimiter, googleAuth);
router.post('/logout',          logout);
router.post('/forgot-password', authLimiter, forgotPassword);
router.put('/reset-password/:token', authLimiter, resetPassword);

export default router;