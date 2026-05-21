import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AiOutlineMail, AiOutlineLock, AiOutlineLogin } from 'react-icons/ai';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to sign in. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden px-4 py-20">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-600/20 rounded-full filter blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Logo/Home link */}
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-black tracking-tight text-white hover:text-indigo-400 transition-colors">
            Modern<span className="text-indigo-500">Journal</span>
          </Link>
          <p className="text-slate-400 mt-2 text-sm font-medium">Access your writer suite dashboard</p>
        </div>

        {/* Auth Glass Card */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-8 sm:p-10 shadow-2xl">
          
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h2>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium leading-relaxed">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 block pl-1">Email Address</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <AiOutlineMail size={18} />
                </span>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-900/60 border border-slate-700/80 text-white rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>

            {/* Password Input */}
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
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-900/60 border border-slate-700/80 text-white rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>

            {/* Submit Trigger */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55"
            >
              <AiOutlineLogin size={18} />
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          {/* Signup Redirect link */}
          <p className="mt-8 text-center text-sm font-medium text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-400 hover:underline font-bold">
              Sign up now
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
