import express from 'express';
import { forgotPassword, getMe, login, logout, resetPassword, signup} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { googleAuth } from "../controllers/authController.js";

const router = express.Router();

router.get('/me', protect, getMe);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
router.post("/google", googleAuth);

export default router;