import bcrypt from 'bcryptjs';

// Holds in-memory collections
const state = {
  users: [],
  blogs: [],
};

// Generates simple unique IDs
const generateId = () => Math.random().toString(36).substring(2, 11) + Date.now().toString(36);

export const memoryDb = {
  // Check if seeded
  isSeeded() {
    return state.users.length > 0;
  },

  // Seed data
  seed(usersList, blogsList) {
    state.users = [...usersList];
    state.blogs = [...blogsList];
    console.log(`[MemoryDB] Seeded ${state.users.length} users and ${state.blogs.length} blogs in-memory!`);
  },

  // USERS CRUD
  async findUserById(id) {
    const user = state.users.find((u) => u._id.toString() === id.toString());
    if (!user) return null;
    const { password, ...safeUser } = user;
    return safeUser;
  },

  async findUserByEmail(email) {
    return state.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  async findUserByUsername(username) {
    return state.users.find((u) => u.username.toLowerCase() === username.toLowerCase()) || null;
  },

  async createUser(userData) {
    const newUser = {
      _id: generateId(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      bio: 'A passionate reader and content writer.',
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    state.users.push(newUser);
    return newUser;
  },

  // BLOGS CRUD
  async getBlogs({ search, tag }) {
    let results = [...state.blogs];

    // Filter by tag
    if (tag) {
      const activeTag = tag.toLowerCase();
      results = results.filter((blog) => 
        blog.tags.some((t) => t.toLowerCase() === activeTag)
      );
    }

    // Filter by search
    if (search) {
      const term = search.toLowerCase();
      results = results.filter(
        (blog) =>
          blog.title.toLowerCase().includes(term) ||
          blog.summary.toLowerCase().includes(term) ||
          blog.content.toLowerCase().includes(term)
      );
    }

    // Sort by latest
    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Populate authors in-memory
    return results.map((blog) => {
      const author = state.users.find((u) => u._id.toString() === blog.author.toString());
      const authorInfo = author
        ? { _id: author._id, username: author.username, email: author.email, avatar: author.avatar, bio: author.bio }
        : { username: 'Anonymous' };
      return { ...blog, author: authorInfo };
    });
  },

  async getBlogById(id) {
    const blog = state.blogs.find((b) => b._id.toString() === id.toString());
    if (!blog) return null;

    // Increment views
    blog.views = (blog.views || 0) + 1;

    const author = state.users.find((u) => u._id.toString() === blog.author.toString());
    const authorInfo = author
      ? { _id: author._id, username: author.username, email: author.email, avatar: author.avatar, bio: author.bio }
      : { username: 'Anonymous' };

    return { ...blog, author: authorInfo };
  },

  async createBlog(blogData, authorId) {
    const wordsCount = blogData.content.split(/\s+/).filter((word) => word.length > 0).length;
    const readTime = Math.max(1, Math.ceil(wordsCount / 200));

    const newBlog = {
      _id: generateId(),
      views: 0,
      readTime,
      coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200',
      tags: [],
      ...blogData,
      author: authorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    state.blogs.push(newBlog);
    return this.getBlogById(newBlog._id);
  },

  async updateBlog(id, blogData, authorId) {
    const blogIndex = state.blogs.findIndex(
      (b) => b._id.toString() === id.toString() && b.author.toString() === authorId.toString()
    );
    if (blogIndex === -1) return null;

    const existingBlog = state.blogs[blogIndex];
    const wordsCount = (blogData.content || existingBlog.content).split(/\s+/).filter((word) => word.length > 0).length;
    const readTime = Math.max(1, Math.ceil(wordsCount / 200));

    const updatedBlog = {
      ...existingBlog,
      ...blogData,
      readTime,
      updatedAt: new Date(),
    };

    state.blogs[blogIndex] = updatedBlog;
    return this.getBlogById(id);
  },

  async deleteBlog(id, authorId) {
    const blogIndex = state.blogs.findIndex(
      (b) => b._id.toString() === id.toString() && b.author.toString() === authorId.toString()
    );
    if (blogIndex === -1) return false;

    state.blogs.splice(blogIndex, 1);
    return true;
  },
};
