import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Thank you for subscribing! We've sent a welcome email to: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-16">
      <div className="container mx-auto px-4">
        
        {/* Newsletter Signup & Branding grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="text-2xl font-black text-white tracking-tight">
              Modern<span className="text-indigo-500">Journal</span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm text-sm">
              A premium, open publishing ecosystem connecting curious minds with developers, product designers, travelers, and food lovers.
            </p>
          </div>

          {/* Newsletter Input container */}
          <div className="lg:col-span-7 space-y-4 bg-slate-800/40 p-6 rounded-3xl border border-slate-800/60 max-w-xl lg:ml-auto w-full">
            <h4 className="text-white font-bold text-base">Subscribe to the weekly digest</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Join 15,000+ readers who receive our curated deep-dives into tech, product design trends, and sustainability straight in their inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 pt-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl placeholder-slate-500 text-white text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 flex-grow"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                Join Digest
              </button>
            </form>
          </div>

        </div>

        {/* Small footer marking */}
        <div className="border-t border-slate-800 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold">
          <p>© {new Date().getFullYear()} ModernJournal Network. All rights reserved.</p>
          
          <div className="flex gap-6">
            <Link to="/" className="hover:text-indigo-400 transition-colors">Stories Feed</Link>
            <a href="https://unsplash.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Photography Credits</a>
            <a href="https://react.dev" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors font-medium text-slate-500">MERN Stack</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
