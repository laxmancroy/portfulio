import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';
import Blog from '../models/Blog.js';
import { getSeedUsers, getSeedBlogs } from '../utils/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env configuration
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blogapp';

async function seedDatabase() {
  console.log('Starting MongoDB Database Seeding...');
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully for seeding.');

    // 1. Clean existing records
    console.log('Clearing existing collections...');
    await User.deleteMany({});
    await Blog.deleteMany({});
    console.log('Collections cleared.');

    // 2. Seed Users
    console.log('Creating users...');
    const seedUsers = getSeedUsers();
    const createdUsers = await User.insertMany(seedUsers);
    console.log(`Created ${createdUsers.length} users successfully.`);

    // Map username to ObjectId
    const userIdsMap = {};
    createdUsers.forEach((user) => {
      userIdsMap[user.username] = user._id;
    });

    // 3. Seed Blogs
    console.log('Creating articles...');
    const seedBlogs = getSeedBlogs(userIdsMap);
    const createdBlogs = await Blog.insertMany(seedBlogs);
    console.log(`Created ${createdBlogs.length} articles successfully.`);

    console.log('\n--- Seeding Complete! ---');
    console.log(`Total Users in DB: ${await User.countDocuments()}`);
    console.log(`Total Blogs in DB: ${await Blog.countDocuments()}`);
    console.log('--------------------------\n');

  } catch (error) {
    console.error('Seeding process failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedDatabase();
