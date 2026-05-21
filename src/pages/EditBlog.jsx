import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth, API_URL } from '../context/AuthContext';
import { AiOutlineArrowLeft, AiOutlineBook, AiOutlineTag, AiOutlinePicture, AiOutlineSave } from 'react-icons/ai';

export const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token, loading: authLoading } = useAuth();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  // 1. Fetch original blog details
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/blogs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to retrieve this article for editing.');
        }
        
        const data = await response.json();
        
        // Populate inputs
        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content);
        setCoverImage(data.coverImage || '');
        setTagsInput(data.tags ? data.tags.join(', ') : '');

        // Verify authorization once auth state is settled
        if (!authLoading) {
          if (!user || user._id.toString() !== data.author._id.toString()) {
            alert('You are not authorized to edit this story.');
            navigate('/');
          }
        }
      } catch (err) {
        console.error('Fetch error for editing:', err);
        setError(err.message || 'An error occurred while loading original draft.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, user, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);

    if (!title.trim() || !summary.trim() || !content.trim()) {
      setError('Title, summary, and article body content are required.');
      setUpdating(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'PUT',
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
        throw new Error(data.message || 'Failed to update the story.');
      }

      alert('Story updated successfully!');
      navigate(`/blog/${id}`);
    } catch (err) {
      console.error('Updating error:', err);
      setError(err.message || 'An error occurred while saving your modifications.');
      setUpdating(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 pt-20">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium">Opening editor workspace...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-16 flex items-center justify-center">
        <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm text-center max-w-md mx-auto">
          <span className="text-5xl mb-4 block">⚠️</span>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Draft Load Failed</h2>
          <p className="text-slate-500 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-colors shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <AiOutlineArrowLeft />
            Return to Feed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-6 mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Edit Story Draft</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Modify and update your published article</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-6">
          
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 block">Article Title</label>
            <input
              type="text"
              required
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
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 focus:bg-white text-slate-900 rounded-2xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
            />
          </div>

          {/* Cover & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Cover Image URL */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 block flex items-center gap-1.5">
                <AiOutlinePicture size={16} className="text-slate-400" />
                Cover Image URL
              </label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 focus:bg-white text-slate-900 rounded-2xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
              />
            </div>

            {/* Tags Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 block flex items-center gap-1.5">
                <AiOutlineTag size={16} className="text-slate-400" />
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 focus:bg-white text-slate-900 rounded-2xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
              />
            </div>

          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 block flex items-center gap-1.5">
              <AiOutlineBook size={16} className="text-slate-400" />
              Article Body Content
            </label>
            <textarea
              required
              rows="12"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:bg-white text-slate-900 rounded-2xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-base font-normal leading-relaxed resize-y"
            />
          </div>

          {/* Buttons */}
          <div className="border-t border-slate-100 pt-6 mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(`/blog/${id}`)}
              className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold rounded-2xl transition-colors cursor-pointer"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              disabled={updating}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-indigo-500/10 active:scale-[0.98] disabled:opacity-55 cursor-pointer flex items-center gap-2"
            >
              <AiOutlineSave size={18} />
              {updating ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
