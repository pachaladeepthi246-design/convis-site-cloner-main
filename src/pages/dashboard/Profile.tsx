import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  const getProfile = () => {
    setLoading(true);
    if (user?.user_metadata) {
      setFullName(user.user_metadata.full_name || '');
      setWebsite(user.user_metadata.website || '');
    }
    setLoading(false);
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName, website: website },
    });

    if (error) {
      setMessage('Error updating profile: ' + error.message);
    } else {
      setMessage('Profile updated successfully!');
    }
    setLoading(false);
  };

  if (loading && !user) {
    return <p className="text-white/70">Loading profile...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Profile</h1>
      <p className="text-white/70 mb-8">Update your user profile here.</p>

      <form onSubmit={updateProfile} className="max-w-lg space-y-6">
        <div>
          <label htmlFor="email" className="block text-white mb-2 font-semibold">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={user?.email || ''}
            disabled
            className="w-full backdrop-blur-xl bg-white/5 border border-white/20 text-white/50 px-6 py-3 rounded-xl"
          />
        </div>
        <div>
          <label htmlFor="fullName" className="block text-white mb-2 font-semibold">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-6 py-3 rounded-xl focus:outline-none focus:border-white/40"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="website" className="block text-white mb-2 font-semibold">
            Website
          </label>
          <input
            id="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-6 py-3 rounded-xl focus:outline-none focus:border-white/40"
            placeholder="https://your-website.com"
          />
        </div>

        <div>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="backdrop-blur-xl bg-white text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Update Profile'}
          </motion.button>
        </div>
      </form>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-xl text-center ${
            message.includes('Error')
              ? 'bg-red-500/20 text-red-300'
              : 'bg-emerald-500/20 text-emerald-300'
          }`}
        >
          {message}
        </motion.div>
      )}
    </div>
  );
}