import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import authRouter from './routes/auth.js';
import blogsRouter from './routes/blogs.js';
import User from './models/User.js';
import Blog from './models/Blog.js';
import { memoryDb } from './utils/memoryDb.js';
import { getSeedUsers, getSeedBlogs } from './utils/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blogapp';

// Middleware
app.use(cors({
  origin: '*', // Allows clean connections from any dev ports
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Set database status
global.useMemoryDb = false;

// 1. Establish Database Connection with Graceful In-Memory Fallback
console.log('Establishing connection to database...');
mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 4000, // Speed up fail-safe activation if MongoDB is offline
  })
  .then(async () => {
    console.log('Successfully connected to MongoDB!');
    
    // Auto-seed if database is empty
    try {
      const usersCount = await User.countDocuments();
      if (usersCount === 0) {
        console.log('MongoDB is empty. Auto-seeding initial collections...');
        
        const seedUsers = getSeedUsers();
        const createdUsers = await User.insertMany(seedUsers);
        
        const userIdsMap = {};
        createdUsers.forEach((u) => {
          userIdsMap[u.username] = u._id;
        });

        const seedBlogs = getSeedBlogs(userIdsMap);
        await Blog.insertMany(seedBlogs);
        console.log('MongoDB successfully initialized with seed data!');
      }
    } catch (err) {
      console.error('Error during auto-seeding MongoDB:', err);
    }
  })
  .catch((error) => {
    console.warn('\n======================================================');
    console.warn('WARNING: Failed to connect to MongoDB server.');
    console.warn(`Attempted URI: ${MONGODB_URI}`);
    console.warn('REASON:', error.message);
    console.warn('------------------------------------------------------');
    console.warn('ACTIVATING: High-fidelity In-Memory Database Fallback!');
    console.warn('The application will work perfectly for local review.');
    console.warn('======================================================\n');
    
    global.useMemoryDb = true;

    // Seed the memory database automatically on start
    const seedUsers = getSeedUsers();
    // Simulate generation of ObjectIds inside memoryDb
    const memoryUsers = seedUsers.map((u, i) => ({ ...u, _id: `mem_user_${i + 1}` }));
    
    const userIdsMap = {};
    memoryUsers.forEach((u) => {
      userIdsMap[u.username] = u._id;
    });

    const seedBlogs = getSeedBlogs(userIdsMap);
    const memoryBlogs = seedBlogs.map((b, i) => ({ ...b, _id: `mem_blog_${i + 1}` }));

    memoryDb.seed(memoryUsers, memoryBlogs);
  });

// 2. Mount API Routes
app.use('/api/auth', authRouter);
app.use('/api/blogs', blogsRouter);

// Health Check & Status Endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'MERN Blog API is running smoothly',
    mode: global.useMemoryDb ? 'In-Memory (Mock DB Fallback)' : 'MongoDB (Production Database)',
    endpoints: {
      auth: '/api/auth',
      blogs: '/api/blogs',
    },
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`Server is actively running on port ${PORT}`);
  console.log(`Local status URL: http://localhost:${PORT}`);
  console.log(`==================================================\n`);
});
