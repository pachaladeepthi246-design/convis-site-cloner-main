import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error: any) {
      console.error('Failed to sign out', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Sign Out
          </button>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Welcome, {user?.email}!</h2>
          <p className="text-white/70 mb-6">
            This is your dashboard. Here you'll be able to manage your projects, view analytics, and update your profile.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-medium text-white mb-2">Projects</h3>
              <p className="text-white/70">Manage your projects and track progress</p>
              <Link to="#" className="mt-4 inline-block text-indigo-400 hover:text-indigo-300">
                View Projects
              </Link>
            </div>
            
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-medium text-white mb-2">Analytics</h3>
              <p className="text-white/70">View insights and performance metrics</p>
              <Link to="#" className="mt-4 inline-block text-indigo-400 hover:text-indigo-300">
                View Analytics
              </Link>
            </div>
            
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-medium text-white mb-2">Profile</h3>
              <p className="text-white/70">Update your account information</p>
              <Link to="#" className="mt-4 inline-block text-indigo-400 hover:text-indigo-300">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;