import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, API_URL } from '../context/AuthContext';
import { AiOutlineSearch, AiOutlineEye, AiOutlineClockCircle } from 'react-icons/ai';

const POPULAR_TAGS = ['All', 'Technology', 'Design', 'UX', 'Travel', 'Cooking', 'Sustainability'];

export const Home = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  
  // Quick debounced search trigger
  const [activeSearch, setActiveSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch blogs on search or tag selection
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      
      let queryUrl = `${API_URL}/blogs`;
      const params = [];
      
      if (activeSearch) {
        params.push(`search=${encodeURIComponent(activeSearch)}`);
      }
      
      if (selectedTag && selectedTag !== 'All') {
        params.push(`tag=${encodeURIComponent(selectedTag)}`);
      }
      
      if (params.length > 0) {
        queryUrl += `?${params.join('&')}`;
      }

      try {
        const response = await fetch(queryUrl);
        if (!response.ok) {
          throw new Error('Failed to retrieve articles');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err.message || 'Something went wrong while loading blogs.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [activeSearch, selectedTag]);

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Segregate the latest blog to showcase as the "Featured Blog"
  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const standardBlogs = blogs.length > 1 ? blogs.slice(1) : [];

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-16">
      
      {/* 1. Large Immersive Hero Header */}
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1e1b4b,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-transparent to-slate-900"></div>
        
        <div className="container mx-auto relative z-10 px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-indigo-500/10 text-indigo-400 text-sm font-semibold tracking-wider uppercase rounded-full mb-6 border border-indigo-400/20">
            Welcome to the Modern Journal
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            Insights, Stories, and Creative Perspectives
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            A premium blogging space exploring technologies, clean user experiences, worldwide travel, and eco-friendly lifestyles.
          </p>

          {/* Interactive Search Bar */}
          <div className="max-w-xl mx-auto relative group">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-400 transition-colors">
              <AiOutlineSearch size={22} />
            </span>
            <input
              type="text"
              placeholder="Search by keywords, titles, or content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-white rounded-full placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-xl text-base"
            />
          </div>
        </div>
      </section>

      {/* 2. Content & Grid Container */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        
        {/* Dynamic Tag Selector Carousel */}
        <div className="flex overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent justify-start md:justify-center gap-2 mb-12">
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap border ${
                selectedTag === tag
                  ? 'bg-indigo-600 border-indigo-600 text-white transform scale-105'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-600'
              }`}
            >
              {tag === 'All' ? '✨ All Stories' : tag}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading && blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-500 font-medium">Loading premium stories...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-8 rounded-2xl text-center shadow-sm max-w-xl mx-auto my-10">
            <h3 className="text-xl font-bold mb-2">Failed to Load Content</h3>
            <p className="mb-4">{error}</p>
            <button
              onClick={() => { setSearch(''); setSelectedTag('All'); }}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm my-10">
            <span className="text-5xl mb-4 block">🔍</span>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No Stories Found</h3>
            <p className="text-slate-500 leading-relaxed mb-6">
              We couldn't find any articles matching "{activeSearch}" in the "{selectedTag}" category. Try adjusting your terms!
            </p>
            <button
              onClick={() => { setSearch(''); setSelectedTag('All'); }}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-colors shadow-md cursor-pointer"
            >
              View All Stories
            </button>
          </div>
        ) : (
          <>
            {/* 3. Grand Featured Post Banner (Only shown when not searching specifically or if it's the first page) */}
            {featuredBlog && !activeSearch && selectedTag === 'All' && (
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg hover:shadow-xl transition-all duration-300 mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Cover Graphic */}
                  <Link to={`/blog/${featuredBlog._id}`} className="lg:col-span-7 h-64 sm:h-96 lg:h-full overflow-hidden block relative group">
                    <img
                      src={featuredBlog.coverImage}
                      alt={featuredBlog.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent"></div>
                  </Link>

                  {/* Body Info */}
                  <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featuredBlog.tags?.map((t) => (
                          <span key={t} className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase rounded-full">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <Link to={`/blog/${featuredBlog._id}`}>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 hover:text-indigo-600 transition-colors mb-4 leading-tight">
                          {featuredBlog.title}
                        </h2>
                      </Link>

                      {/* Excerpt */}
                      <p className="text-slate-600 text-base leading-relaxed mb-6 line-clamp-4">
                        {featuredBlog.summary}
                      </p>
                    </div>

                    {/* Author & Meta footer */}
                    <div className="border-t border-slate-100 pt-6 mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={featuredBlog.author?.avatar}
                          alt={featuredBlog.author?.username}
                          className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-100"
                        />
                        <div>
                          <p className="text-sm font-bold text-slate-800">{featuredBlog.author?.username}</p>
                          <p className="text-xs text-slate-400 font-medium">{formatDate(featuredBlog.createdAt)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <AiOutlineClockCircle size={14} className="text-slate-400" />
                          {featuredBlog.readTime} min read
                        </span>
                        <span className="flex items-center gap-1.5">
                          <AiOutlineEye size={15} className="text-slate-400" />
                          {featuredBlog.views} views
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Secondary Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* If search/tag active, show all blogs in grid. Otherwise, show standardBlogs */}
              {(activeSearch || selectedTag !== 'All' ? blogs : standardBlogs).map((blog) => (
                <article
                  key={blog._id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Photo */}
                    <Link to={`/blog/${blog._id}`} className="h-48 overflow-hidden block relative group">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Dynamic first tag overlay */}
                      {blog.tags?.[0] && (
                        <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold uppercase rounded-full shadow-sm">
                          {blog.tags[0]}
                        </span>
                      )}
                    </Link>

                    {/* Meta & Excerpt content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <AiOutlineClockCircle size={13} />
                          {blog.readTime} min read
                        </span>
                        <span>•</span>
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>

                      <Link to={`/blog/${blog._id}`}>
                        <h3 className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors mb-3 line-clamp-2 leading-snug">
                          {blog.title}
                        </h3>
                      </Link>

                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                        {blog.summary}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Author Information */}
                  <div className="px-6 pb-6 pt-4 border-t border-slate-50 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={blog.author?.avatar}
                        alt={blog.author?.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-xs font-bold text-slate-700">{blog.author?.username}</span>
                    </div>

                    <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                      <AiOutlineEye size={14} />
                      {blog.views}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
