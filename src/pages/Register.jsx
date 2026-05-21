import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlineBook, AiOutlineUserAdd } from 'react-icons/ai';

// Pre-curated, gorgeous avatars to let users select instantly
const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', // Woman
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', // Man Glasses
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', // Woman Smiling
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', // Man Beard
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150', // Woman Curly
];

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0]);
  const [customAvatar, setCustomAvatar] = useState('');
  const [bio, setBio] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    // Determine final avatar URL
    const finalAvatar = customAvatar.trim() || selectedAvatar;

    try {
      await register(username, email, password, finalAvatar, bio || undefined);
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden px-4 py-24">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-600/10 rounded-full filter blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-xl relative z-10">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-black tracking-tight text-white hover:text-indigo-400 transition-colors">
            Modern<span className="text-indigo-500">Journal</span>
          </Link>
          <p className="text-slate-400 mt-2 text-sm font-medium">Create a free author account and start writing</p>
        </div>

        {/* Signup Glass Card */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Join the Community</h2>

          {/* Error Feedback */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium leading-relaxed">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Username & Email inputs Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 block pl-1">Username</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <AiOutlineUser size={18} />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="john_doe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-slate-700/80 text-white rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 block pl-1">Email Address</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <AiOutlineMail size={18} />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="john@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-slate-700/80 text-white rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Passwords Input Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 block pl-1">Password</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <AiOutlineLock size={18} />
                  </span>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-slate-700/80 text-white rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 block pl-1">Confirm Password</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <AiOutlineLock size={18} />
                  </span>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-slate-700/80 text-white rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Biographic Information */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 block pl-1">Short Bio (Optional)</label>
              <div className="relative group">
                <span className="absolute top-3 left-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <AiOutlineBook size={18} />
                </span>
                <textarea
                  rows="2"
                  placeholder="Tell the readers about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-slate-700/80 text-white rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm resize-none"
                />
              </div>
            </div>

            {/* Premium Selector Avatar section */}
            <div className="space-y-3 bg-slate-900/40 p-5 rounded-2xl border border-slate-700/50">
              <label className="text-sm font-bold text-slate-200 block">Select Profile Avatar</label>
              
              <div className="flex gap-4 items-center mb-2 overflow-x-auto pb-1">
                {PRESET_AVATARS.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => { setSelectedAvatar(url); setCustomAvatar(''); }}
                    className={`w-12 h-12 rounded-full overflow-hidden border-2 cursor-pointer flex-shrink-0 transition-transform ${
                      selectedAvatar === url && !customAvatar
                        ? 'border-indigo-500 scale-110 shadow-lg ring-2 ring-indigo-500/30'
                        : 'border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <img src={url} alt={`Avatar Preset ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Or custom URL */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Or provide a custom image URL:</span>
                <input
                  type="url"
                  placeholder="https://example.com/my-photo.jpg"
                  value={customAvatar}
                  onChange={(e) => setCustomAvatar(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-900/80 border border-slate-700/80 text-white rounded-lg placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
                />
              </div>
            </div>

            {/* Register Trigger button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55"
            >
              <AiOutlineUserAdd size={18} />
              {loading ? 'Registering Account...' : 'Sign Up'}
            </button>
          </form>

          {/* Login redirect link */}
          <p className="mt-8 text-center text-sm font-medium text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:underline font-bold">
              Sign in here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
