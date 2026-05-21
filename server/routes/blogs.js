import express from 'express';
import Blog from '../models/Blog.js';
import { authenticateToken } from './auth.js';
import { memoryDb } from '../utils/memoryDb.js';

const router = express.Router();

// GET /api/blogs (Fetch all blogs - accessible to guests)
// Supports search query: ?search=keyword and tag filter: ?tag=name
router.get('/', async (req, res) => {
  const { search, tag } = req.query;

  try {
    if (global.useMemoryDb) {
      const blogs = await memoryDb.getBlogs({ search, tag });
      return res.json(blogs);
    } else {
      let query = {};

      if (tag) {
        // Case insensitive tag matching
        query.tags = { $regex: new RegExp('^' + tag + '$', 'i') };
      }

      if (search) {
        const searchRegex = new RegExp(search, 'i');
        query.$or = [
          { title: searchRegex },
          { summary: searchRegex },
          { content: searchRegex },
        ];
      }

      const blogs = await Blog.find(query)
        .populate('author', 'username email avatar bio')
        .sort({ createdAt: -1 });

      return res.json(blogs);
    }
  } catch (error) {
    console.error('Fetch blogs error:', error);
    return res.status(500).json({ message: 'Internal server error while fetching blogs', error: error.message });
  }
});

// GET /api/blogs/:id (Fetch a single blog post - accessible to guests)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (global.useMemoryDb) {
      const blog = await memoryDb.getBlogById(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      return res.json(blog);
    } else {
      // Find blog, increment pageviews, and populate author details
      const blog = await Blog.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      ).populate('author', 'username email avatar bio');

      if (!blog) {
        return res.status(404).json({ message: 'Blog post not found' });
      }

      return res.json(blog);
    }
  } catch (error) {
    console.error('Fetch single blog error:', error);
    // If it's a CastError from MongoDB, return a clean 404
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Blog post not found (invalid identifier)' });
    }
    return res.status(500).json({ message: 'Error retrieving blog post', error: error.message });
  }
});

// POST /api/blogs (Create a new blog post - Protected)
router.post('/', authenticateToken, async (req, res) => {
  const { title, summary, content, coverImage, tags } = req.body;

  if (!title || !summary || !content) {
    return res.status(400).json({ message: 'Title, summary, and content are required' });
  }

  // Extract clean tags
  const cleanTags = Array.isArray(tags)
    ? tags.map((t) => t.trim()).filter((t) => t.length > 0)
    : typeof tags === 'string'
    ? tags.split(',').map((t) => t.trim()).filter((t) => t.length > 0)
    : [];

  try {
    if (global.useMemoryDb) {
      const blog = await memoryDb.createBlog(
        {
          title,
          summary,
          content,
          coverImage: coverImage || undefined,
          tags: cleanTags,
        },
        req.user._id
      );

      return res.status(201).json({
        message: 'Blog published successfully!',
        blog,
      });
    } else {
      const newBlog = new Blog({
        title,
        summary,
        content,
        coverImage: coverImage || undefined,
        tags: cleanTags,
        author: req.user._id,
      });

      await newBlog.save();
      
      const populatedBlog = await Blog.findById(newBlog._id).populate(
        'author',
        'username email avatar bio'
      );

      return res.status(201).json({
        message: 'Blog published successfully!',
        blog: populatedBlog,
      });
    }
  } catch (error) {
    console.error('Create blog error:', error);
    return res.status(500).json({ message: 'Error publishing blog post', error: error.message });
  }
});

// PUT /api/blogs/:id (Update a blog post - Protected, Author Only)
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, summary, content, coverImage, tags } = req.body;

  // Extract clean tags
  const cleanTags = Array.isArray(tags)
    ? tags.map((t) => t.trim()).filter((t) => t.length > 0)
    : typeof tags === 'string'
    ? tags.split(',').map((t) => t.trim()).filter((t) => t.length > 0)
    : undefined;

  try {
    if (global.useMemoryDb) {
      const updatedData = {};
      if (title) updatedData.title = title;
      if (summary) updatedData.summary = summary;
      if (content) updatedData.content = content;
      if (coverImage) updatedData.coverImage = coverImage;
      if (cleanTags) updatedData.tags = cleanTags;

      const blog = await memoryDb.updateBlog(id, updatedData, req.user._id);

      if (!blog) {
        return res.status(403).json({ message: 'Unauthorized or blog post not found' });
      }

      return res.json({
        message: 'Blog updated successfully!',
        blog,
      });
    } else {
      // Find blog to check ownership first
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog post not found' });
      }

      if (blog.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to edit this blog post' });
      }

      // Update fields
      if (title) blog.title = title;
      if (summary) blog.summary = summary;
      if (content) blog.content = content;
      if (coverImage) blog.coverImage = coverImage;
      if (cleanTags) blog.tags = cleanTags;

      await blog.save();

      const populatedBlog = await Blog.findById(blog._id).populate(
        'author',
        'username email avatar bio'
      );

      return res.json({
        message: 'Blog updated successfully!',
        blog: populatedBlog,
      });
    }
  } catch (error) {
    console.error('Update blog error:', error);
    return res.status(500).json({ message: 'Error updating blog post', error: error.message });
  }
});

// DELETE /api/blogs/:id (Delete a blog post - Protected, Author Only)
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    if (global.useMemoryDb) {
      const success = await memoryDb.deleteBlog(id, req.user._id);
      if (!success) {
        return res.status(403).json({ message: 'Unauthorized or blog post not found' });
      }
      return res.json({ message: 'Blog post deleted successfully!' });
    } else {
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog post not found' });
      }

      if (blog.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to delete this blog post' });
      }

      await Blog.findByIdAndDelete(id);
      return res.json({ message: 'Blog post deleted successfully!' });
    }
  } catch (error) {
    console.error('Delete blog error:', error);
    return res.status(500).json({ message: 'Error deleting blog post', error: error.message });
  }
});

export default router;
