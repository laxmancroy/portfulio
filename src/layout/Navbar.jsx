import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AiOutlineMenu, AiOutlineClose, AiOutlinePlus, AiOutlineLogout, AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-800 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-black tracking-tight text-white hover:opacity-90 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            Modern<span className="text-indigo-500">Journal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-slate-300 hover:text-white font-semibold transition-colors text-sm"
            >
              Feed
            </Link>

            {user ? (
              // Authenticated User Desktop layout
              <div className="flex items-center space-x-5">
                <Link
                  to="/create"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <AiOutlinePlus size={14} />
                  Write Story
                </Link>
                
                {/* User avatar & username */}
                <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3.5 py-1.5 rounded-full select-none">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-6.5 h-6.5 rounded-full object-cover"
                  />
                  <span className="text-xs font-bold text-slate-200">Hi, {user.username}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-red-400 font-semibold transition-colors text-sm flex items-center gap-1 cursor-pointer"
                >
                  <AiOutlineLogout size={16} />
                  Sign Out
                </button>
              </div>
            ) : (
              // Guest Desktop layout
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-slate-300 hover:text-white font-semibold transition-colors text-sm flex items-center gap-1"
                >
                  <AiOutlineLogin size={15} />
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs font-bold transition-colors shadow-md flex items-center gap-1"
                >
                  <AiOutlineUserAdd size={15} />
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-t border-slate-800 shadow-xl py-6 px-4 animate-slideDown">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="py-2.5 text-slate-300 hover:text-white font-semibold border-b border-slate-800"
              >
                Stories Feed
              </Link>

              {user ? (
                // Authenticated Mobile layout
                <div className="flex flex-col gap-4 pt-2">
                  <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-2xl border border-slate-700">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-bold text-white">{user.username}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </div>

                  <Link
                    to="/create"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <AiOutlinePlus size={16} />
                    Write Story
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-center py-3 border border-slate-700 text-red-400 hover:bg-red-500/10 font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <AiOutlineLogout size={16} />
                    Sign Out
                  </button>
                </div>
              ) : (
                // Guest Mobile layout
                <div className="flex flex-col gap-2 pt-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-center py-3 border border-slate-800 text-slate-300 hover:text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <AiOutlineLogin size={16} />
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <AiOutlineUserAdd size={16} />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
