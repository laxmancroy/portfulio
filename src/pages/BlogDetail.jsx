import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth, API_URL } from '../context/AuthContext';
import { AiOutlineArrowLeft, AiOutlineClockCircle, AiOutlineEye, AiOutlineEdit, AiOutlineDelete, AiOutlineCalendar } from 'react-icons/ai';

export const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/blogs/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('This blog post could not be found.');
          }
          throw new Error('Failed to retrieve this article.');
        }
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        console.error('Error fetching blog details:', err);
        setError(err.message || 'An error occurred while loading this story.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you absolutely sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete the article.');
      }

      alert('Blog post deleted successfully!');
      navigate('/');
    } catch (err) {
      console.error('Delete error:', err);
      alert(err.message || 'An error occurred while trying to delete this post.');
      setDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Determine if the current visitor is the author of this post
  const isAuthor = user && blog?.author && user._id.toString() === blog.author._id.toString();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 pt-20">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium">Opening page layout...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-16 flex items-center justify-center">
        <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm text-center max-w-md mx-auto">
          <span className="text-5xl mb-4 block">⚠️</span>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Failed to View Post</h2>
          <p className="text-slate-500 mb-6">{error || 'Article details are unavailable.'}</p>
          <Link
            to="/"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-colors shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <AiOutlineArrowLeft />
            Back to Home Feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-20">
      
      {/* Back & Writer Actions Panel */}
      <div className="container mx-auto px-4 max-w-4xl mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold transition-colors text-sm"
          >
            <AiOutlineArrowLeft size={16} />
            Back to Articles
          </Link>

          {/* Render editor portal controls if authorized writer */}
          {isAuthor && (
            <div className="flex gap-2">
              <Link
                to={`/edit/${blog._id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs rounded-full border border-indigo-200 transition-colors"
              >
                <AiOutlineEdit size={14} />
                Edit Post
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 font-bold text-xs rounded-full border border-red-200 transition-colors disabled:opacity-55 cursor-pointer"
              >
                <AiOutlineDelete size={14} />
                {deleting ? 'Deleting...' : 'Delete Post'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="container mx-auto px-4 max-w-4xl">
        <article className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md">
          
          {/* Cover Graphic Banner */}
          <div className="h-64 sm:h-96 md:h-[450px] overflow-hidden relative">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
          </div>

          {/* Details & Body Container */}
          <div className="p-6 sm:p-10 md:p-12">
            
            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags?.map((t) => (
                <span
                  key={t}
                  className="px-3.5 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase rounded-full tracking-wider"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Headline Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Reading Details bar */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-400 border-b border-slate-100 pb-8 mb-8">
              <span className="flex items-center gap-1.5">
                <AiOutlineCalendar size={16} className="text-slate-400" />
                Published {formatDate(blog.createdAt)}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <AiOutlineClockCircle size={16} className="text-slate-400" />
                {blog.readTime} min read
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <AiOutlineEye size={17} className="text-slate-400" />
                {blog.views} pageviews
              </span>
            </div>

            {/* High-fidelity Body Text content */}
            <div className="prose prose-indigo prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
              {blog.content.split('\n\n').map((paragraph, index) => {
                // Render headers
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-2xl font-bold text-slate-900 pt-4 pb-2">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('#### ')) {
                  return (
                    <h4 key={index} className="text-xl font-bold text-slate-900 pt-2 pb-1">
                      {paragraph.replace('#### ', '')}
                    </h4>
                  );
                }
                
                // Render bullet lists
                if (paragraph.startsWith('* ') || paragraph.startsWith('- ')) {
                  return (
                    <ul key={index} className="list-disc pl-6 space-y-2 text-slate-700 my-4">
                      {paragraph.split('\n').map((item, itemIdx) => (
                        <li key={itemIdx}>{item.replace(/^[*-\s]+/, '')}</li>
                      ))}
                    </ul>
                  );
                }

                // Render preformatted code snippets
                if (paragraph.startsWith('\`\`\`')) {
                  const lines = paragraph.split('\n');
                  const codeLines = lines.slice(1, lines.length - 1).join('\n');
                  return (
                    <pre key={index} className="bg-slate-900 text-slate-100 p-5 rounded-2xl overflow-x-auto text-sm font-mono my-6 border border-slate-800">
                      <code>{codeLines}</code>
                    </pre>
                  );
                }

                // Standard paragraph
                return (
                  <p key={index} className="text-slate-700 leading-relaxed text-[17px] whitespace-pre-line">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Author Biography Footer Card */}
            <div className="border-t border-slate-100 pt-10 mt-12">
              <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  src={blog.author?.avatar}
                  alt={blog.author?.username}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-md flex-shrink-0"
                />
                <div className="text-center sm:text-left flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h4 className="text-lg font-bold text-slate-800">Published By {blog.author?.username}</h4>
                    <span className="text-xs font-semibold text-slate-400 select-none">Contributor Profile</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 max-w-2xl">
                    {blog.author?.bio || 'An active writer sharing unique perspectives and industry-level ideas on this publication journal.'}
                  </p>
                  <div className="flex justify-center sm:justify-start gap-2">
                    <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 shadow-sm">
                      📧 {blog.author?.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </article>
      </div>

    </div>
  );
};
