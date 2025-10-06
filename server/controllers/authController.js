import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

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