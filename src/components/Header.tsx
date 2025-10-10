import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Career', href: '/career' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl bg-slate-900/80 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src="/clyrox.jpg" alt="Clyrox Logo" className="h-10" />
          </a>

          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white/90 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <a
                    href="/dashboard"
                    className="backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-semibold border border-white/20 transition-all"
                  >
                    Dashboard
                  </a>
                  <button
                    onClick={handleLogout}
                    className="backdrop-blur-xl bg-red-500/20 hover:bg-red-500/30 text-white p-2 rounded-lg border border-red-500/30 transition-all"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className="text-white/90 hover:text-white transition-colors">
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold transition-all"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden backdrop-blur-xl bg-white/10 p-2 rounded-lg border border-white/20"
          >
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden backdrop-blur-xl bg-slate-900/95 border-t border-white/10"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white/90 hover:text-white transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="border-t border-white/20 pt-4 mt-2 flex flex-col gap-4">
                {user ? (
                  <>
                    <a href="/dashboard" onClick={() => setIsOpen(false)} className="text-white/90 hover:text-white transition-colors py-2">Dashboard</a>
                    <button onClick={handleLogout} className="text-left text-red-400 hover:text-red-300 transition-colors py-2">Logout</button>
                  </>
                ) : (
                  <>
                    <a href="/login" onClick={() => setIsOpen(false)} className="text-white/90 hover:text-white transition-colors py-2">Login</a>
                    <a href="/signup" onClick={() => setIsOpen(false)} className="text-white/90 hover:text-white transition-colors py-2">Sign Up</a>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}