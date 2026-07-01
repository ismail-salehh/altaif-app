import { generateTokenAndSetCookie } from '../utils/generateToken.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

/* ── Email transporter (only built when env vars are present) ───── */
function createTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null;
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    tls: { rejectUnauthorized: process.env.NODE_ENV === 'production' },
  });
}

/* ── Signup ──────────────────────────────────────────────────────── */
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body; // already validated + sanitised by middleware

    if (await User.findOne({ email }))
      return res.status(400).json({ error: 'Email is already registered' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ username, email, password: hashedPassword });
    const token   = generateTokenAndSetCookie(newUser._id, res);

    logger.info('User signed up', { userId: newUser._id });
    res.status(201).json({ token, user: { _id: newUser._id, username: newUser.username, email: newUser.email } });
  } catch (err) {
    logger.error('signup error', { message: err.message });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* ── Login ───────────────────────────────────────────────────────── */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    // Constant-time comparison to prevent user-enumeration timing attacks
    const passwordOk = user ? await bcrypt.compare(password, user.password) : false;
    if (!user || !passwordOk)
      return res.status(400).json({ error: 'Invalid email or password' });

    const token = generateTokenAndSetCookie(user._id, res);
    logger.info('User logged in', { userId: user._id });
    res.status(200).json({ token, user: { _id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    logger.error('login error', { message: err.message });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* ── Google Auth ─────────────────────────────────────────────────── */
export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });

    const client  = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket  = await client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    if (!payload) return res.status(400).json({ error: 'Invalid Google token' });

    const { email, sub: googleId, name } = payload;
    let user = await User.findOne({ googleId }) || await User.findOne({ email });

    if (user && !user.googleId) { user.googleId = googleId; await user.save(); }
    if (!user) user = await User.create({ email, googleId, username: name });

    const jwToken = generateTokenAndSetCookie(user._id, res);
    res.status(200).json({ token: jwToken, user: { _id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    logger.error('googleAuth error', { message: err.message });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* ── Forgot Password ─────────────────────────────────────────────── */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await User.findOne({ email });
    // Always return 200 — don't reveal whether email exists
    if (!user) return res.status(200).json({ message: 'If that email exists, a reset link has been sent.' });

    // Generate token → store HASHED version in DB, send PLAIN version in email
    const plainToken  = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(plainToken).digest('hex');

    user.resetToken      = hashedToken;
    user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    const clientUrl = process.env.CLIENT_URL || 'https://altaif-app.onrender.com';
    const resetUrl  = `${clientUrl}/reset-password/${plainToken}`;

    const transporter = createTransporter();
    if (!transporter) {
      logger.warn('Email transporter not configured — reset token generated but not sent', { userId: user._id });
      return res.status(200).json({ message: 'If that email exists, a reset link has been sent.' });
    }

    await transporter.sendMail({
      from:    process.env.EMAIL_USER,
      to:      email,
      subject: 'Password Reset',
      text:    `Reset your password: ${resetUrl}\n\nThis link expires in 1 hour.`,
    });

    logger.info('Password reset email sent', { userId: user._id });
    res.status(200).json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (err) {
    logger.error('forgotPassword error', { message: err.message });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* ── Reset Password ──────────────────────────────────────────────── */
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!token || !password) return res.status(400).json({ error: 'Token and new password are required' });
    if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

    // Hash the incoming token to compare with stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetToken:      hashedToken,
      resetTokenExpiry: { $gt: Date.now() },
    }).select('+resetToken +resetTokenExpiry');

    if (!user) return res.status(400).json({ error: 'Invalid or expired reset link' });

    user.password        = await bcrypt.hash(password, 12);
    user.resetToken      = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    logger.info('Password reset successful', { userId: user._id });
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    logger.error('resetPassword error', { message: err.message });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* ── Logout ──────────────────────────────────────────────────────── */
export const logout = async (_req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    logger.error('logout error', { message: err.message });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* ── Get Me ──────────────────────────────────────────────────────── */
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(401).json({ error: 'User not found' });
    // Return the user object directly (not wrapped in { user: ... })
    res.status(200).json(user);
  } catch (err) {
    logger.error('getMe error', { message: err.message });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};