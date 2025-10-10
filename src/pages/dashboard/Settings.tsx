import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Settings() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error("Error updating password: " + error.message);
    } else {
      toast.success("Password updated successfully!");
      setPassword('');
      setConfirmPassword('');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
      
      <div className="max-w-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Change Password</h2>
        <form onSubmit={handlePasswordUpdate} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-white mb-2 font-semibold">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-6 py-3 rounded-xl focus:outline-none focus:border-white/40"
              placeholder="New password (min. 6 characters)"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-white mb-2 font-semibold">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-6 py-3 rounded-xl focus:outline-none focus:border-white/40"
              placeholder="Confirm new password"
            />
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="backdrop-blur-xl bg-white text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Update Password'}
          </motion.button>
        </form>
      </div>
    </div>
  );
}