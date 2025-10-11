import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Helper: create nodemailer transporter if env vars are present
const createTransporter = () => {
  return nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
    tls: {
    rejectUnauthorized: process.env.NODE_ENV === "production",
  },
  });
};

// ✅ Signup Controller
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered!" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    const token = generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      token,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profileImg: newUser.profileImg,
      },
    });

  } catch (err) {
    console.log(`Error in signup controller ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImg: user.profileImg,
      },
    });

  } catch (err) {
    console.log(`Error in login controller ${err.message}`);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) return res.status(400).json({ error: 'Invalid Google token payload' });

    const { email, sub: googleId } = payload;
    let user = await User.findOne({ googleId }) || await User.findOne({ email });

    if (user && !user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    if (!user) user = await User.create({ email, googleId });
    const jwToken = generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      token: jwToken,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImg: user.profileImg,
      },
    });
  } catch (err) {
    console.error('Error in googleAuth:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = crypto.randomBytes(20).toString('hex');

    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    const clientUrl = process.env.CLIENT_URL || 'https://altaif-app.onrender.com';
    const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

    const message = `Reset your password using the following link: ${resetUrl}\n\nThis link expires in 1 hour.`;

    const transporter = createTransporter();
    if (!transporter) {
      console.warn('Email transporter is not configured. Skipping email send.');
      return res.status(200).json({ message: 'Reset token generated. Email transporter not configured.' });
    }

    const mail = transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: message,
    });
    await mail;

    res.status(200).json({ message: 'Reset message sent!' });
  } catch (err) {
    console.error(`Error in sending the reset message: ${err?.message || err}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!token || !password) return res.status(400).json({ message: 'Token and new password required' });

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    // Hash new password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error(`Error in resetting the password: ${err?.message || err}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// ✅ Logout Controller
export const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (err) {
    console.log(`Error in logout controller ${err.message}`);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

// In getMe:
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(401).json({ error: "User not found" });
    res.status(200).json({ user });  // Return user directly
  } catch (err) {
    console.log(`Error in getMe controller ${err.message}`);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};