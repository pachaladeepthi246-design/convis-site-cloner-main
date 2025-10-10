import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-md mx-auto">
        <AnimatedSection>
          <GlassCard className="p-8">
            <h1 className="text-4xl font-bold text-white text-center mb-6">Login</h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-white mb-2 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-6 py-3 rounded-xl focus:outline-none focus:border-white/40"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-white mb-2 font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-6 py-3 rounded-xl focus:outline-none focus:border-white/40"
                  placeholder="••••••••"
                />
              </div>
              {error && <p className="text-red-400 text-center">{error}</p>}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full backdrop-blur-xl bg-white text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </motion.button>
            </form>
            <p className="text-center text-white/70 mt-6">
              Don't have an account?{' '}
              <a href="/signup" className="text-white font-semibold hover:underline">
                Sign up
              </a>
            </p>
          </GlassCard>
        </AnimatedSection>
      </div>
    </div>
  );
}