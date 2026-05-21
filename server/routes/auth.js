import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { memoryDb } from '../utils/memoryDb.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkeyforblogappmern';

// Middleware to verify JWT token and inject active user context
export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: 'No authentication token provided, access denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (global.useMemoryDb) {
      const user = await memoryDb.findUserById(decoded.id);
      if (!user) return res.status(404).json({ message: 'User not found in memory' });
      req.user = user;
    } else {
      const user = await User.findById(decoded.id).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      req.user = user;
    }
    
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired session token, please sign in again' });
  }
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, email, password, avatar, bio } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  try {
    if (global.useMemoryDb) {
      // Memory DB registration
      const existingEmail = await memoryDb.findUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ message: 'A user with this email address already exists' });
      }

      const existingUsername = await memoryDb.findUserByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ message: 'This username is already taken' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await memoryDb.createUser({
        username,
        email,
        password: hashedPassword,
        avatar: avatar || undefined,
        bio: bio || undefined,
      });

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      
      const { password: _, ...userWithoutPassword } = user;
      return res.status(201).json({
        message: 'Registration successful!',
        token,
        user: userWithoutPassword,
      });
    } else {
      // MongoDB registration
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: 'A user with this email address already exists' });
      }

      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ message: 'This username is already taken' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        avatar,
        bio,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '7d' });

      return res.status(201).json({
        message: 'Registration successful!',
        token,
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          avatar: newUser.avatar,
          bio: newUser.bio,
        },
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error during registration', error: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    if (global.useMemoryDb) {
      // Memory DB login
      const user = await memoryDb.findUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      const { password: _, ...userWithoutPassword } = user;

      return res.json({
        message: 'Login successful!',
        token,
        user: userWithoutPassword,
      });
    } else {
      // MongoDB login
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

      return res.json({
        message: 'Login successful!',
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          bio: user.bio,
        },
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error during login', error: error.message });
  }
});

// GET /api/auth/me (Protected - get currently logged-in user profile)
router.get('/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
