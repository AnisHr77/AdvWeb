import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' });

    const admin = await Admin.findOne({ email });
    console.log('--- Login Attempt ---');
    console.log('Email received:', email);
    console.log('Admin found:', !!admin);
    
    if (admin) {
      const isMatch = await admin.matchPassword(password);
      console.log('Password match:', isMatch);
      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
    } else {
      console.log('User not found in database');
      return res.status(401).json({ message: 'User not found' });
    }

    const token = signToken(admin._id);
    res.json({
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  res.json({ admin: { id: req.admin._id, name: req.admin.name, email: req.admin.email, role: req.admin.role } });
};

// POST /api/auth/logout  (client-side token drop; server confirms)
export const logout = async (_req, res) => {
  res.json({ message: 'Logged out successfully' });
};
