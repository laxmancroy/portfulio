import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    summary: {
      type: String,
      required: [true, 'Blog summary is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Blog content is required'],
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Blog author is required'],
    },
    tags: {
      type: [String],
      default: [],
    },
    readTime: {
      type: Number,
      default: 5, // in minutes
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Helper to auto-calculate reading time before saving if content is modified
blogSchema.pre('save', function (next) {
  if (this.isModified('content')) {
    // Average reading speed is 200 words per minute
    const wordsCount = this.content.split(/\s+/).filter((word) => word.length > 0).length;
    this.readTime = Math.max(1, Math.ceil(wordsCount / 200));
  }
  next();
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;
