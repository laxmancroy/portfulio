import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, API_URL } from '../context/AuthContext';
import { AiOutlineArrowLeft, AiOutlineBook, AiOutlineTag, AiOutlinePicture, AiOutlineEye, AiOutlineEdit } from 'react-icons/ai';

const DEFAULT_COVER = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200';

export const CreateBlog = () => {
  const navigate = useNavigate();
  const { user, token, loading: authLoading } = useAuth();

  // Redirect if not signed in
  useEffect(() => {
    if (!authLoading && !user) {
      alert('Please sign in to publish a story.');
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('write'); // 'write' or 'preview'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPublishing(true);
    setError(null);

    if (!title.trim() || !summary.trim() || !content.trim()) {
      setError('Title, summary, and article body are required.');
      setPublishing(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          summary,
          content,
          coverImage: coverImage.trim() || undefined,
          tags: tagsInput,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to publish article.');
      }

      alert('Story published successfully!');
      navigate(`/blog/${data.blog._id}`);
    } catch (err) {
      console.error('Publishing error:', err);
      setError(err.message || 'An error occurred while publishing your article.');
      setPublishing(false);
    }
  };

  // Convert comma string to tags array for card preview
  const getTagsArray = () => {
    return tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 pt-20">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium font-semibold">Authorizing writer...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Page title & tab bars */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create a Story</h1>
            <p className="text-slate-500 mt-1 text-sm font-medium">Draft and publish premium articles on the network</p>
          </div>
          
          {/* Write vs Preview toggle */}
          <div className="flex bg-slate-200 p-1 rounded-xl w-fit self-start">
            <button
              onClick={() => setActiveTab('write')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'write'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AiOutlineEdit size={14} />
              Write Studio
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'preview'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AiOutlineEye size={14} />
              Live Card Preview
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Tab 1: Form Editor */}
        {activeTab === 'write' && (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-6">
            
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 block">Article Title</label>
              <input
                type="text"
                required
                placeholder="Enter a compelling, catchy title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 focus:bg-white text-slate-900 font-extrabold text-lg rounded-2xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 block">Short Summary / Excerpt</label>
              <input
                type="text"
                required
                placeholder="A short teaser summary to show on search indexes and grid cards..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 focus:bg-white text-slate-900 rounded-2xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
              />
            </div>

            {/* Grid for Image URL & Category Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Cover Image URL */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block flex items-center gap-1.5">
                  <AiOutlinePicture size={16} className="text-slate-400" />
                  Cover Image URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://unsplash.com/photos/..."
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 focus:bg-white text-slate-900 rounded-2xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                />
              </div>

              {/* Tags Comma-separated */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block flex items-center gap-1.5">
                  <AiOutlineTag size={16} className="text-slate-400" />
                  Tags / Categories (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="React, Tech, UX, Travel"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 focus:bg-white text-slate-900 rounded-2xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                />
              </div>

            </div>

            {/* Article Content Markdown Area */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 block flex items-center gap-1.5">
                <AiOutlineBook size={16} className="text-slate-400" />
                Article Body Content
              </label>
              <textarea
                required
                rows="12"
                placeholder="Write your article body here. Support empty spacing for paragraphs. You can structure headings by starting a line with '### ' or code blocks inside triple backticks (\`\`\`)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:bg-white text-slate-900 rounded-2xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-base font-normal leading-relaxed resize-y"
              />
            </div>

            {/* Action buttons */}
            <div className="border-t border-slate-100 pt-6 mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold rounded-2xl transition-colors cursor-pointer"
              >
                Cancel Draft
              </button>
              <button
                type="submit"
                disabled={publishing}
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-indigo-500/10 active:scale-[0.98] disabled:opacity-55 cursor-pointer"
              >
                {publishing ? 'Publishing Story...' : 'Publish Story 🚀'}
              </button>
            </div>

          </form>
        )}

        {/* Tab 2: Live Preview */}
        {activeTab === 'preview' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="p-4 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-2xl text-xs font-semibold leading-relaxed">
              💡 This is a live preview of how your article will look inside the homepage search index feeds and category lists.
            </div>

            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md flex flex-col justify-between">
                <div>
                  {/* Cover */}
                  <div className="h-48 overflow-hidden relative bg-slate-100">
                    <img
                      src={coverImage.trim() || DEFAULT_COVER}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                    {getTagsArray()[0] && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold uppercase rounded-full shadow-sm">
                        {getTagsArray()[0]}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-3">
                      <span>5 min read</span>
                      <span>•</span>
                      <span>Just now</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 leading-snug">
                      {title.trim() || 'Untitled Story Headline'}
                    </h3>

                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                      {summary.trim() || 'Provide a teaser summary excerpt to see it rendered beautifully here.'}
                    </p>
                  </div>
                </div>

                {/* Author footer */}
                <div className="px-6 pb-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
                      alt="User Preview"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-xs font-bold text-slate-700">{user?.username || 'WriterProfile'}</span>
                  </div>

                  <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                    👁️ 0
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <button
                onClick={() => setActiveTab('write')}
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-colors shadow-md cursor-pointer"
              >
                Return to Editor Workspace
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
