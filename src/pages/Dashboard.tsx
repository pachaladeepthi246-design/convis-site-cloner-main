import { useAuth } from '../contexts/AuthContext';
import { DashboardLayout } from '../components/ui/DashboardLayout';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Welcome, {user?.email}!</h2>
        <p className="text-white/70 mb-6">
          This is your dashboard. Use the sidebar to navigate through different sections.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h3 className="text-lg font-medium text-white mb-2">Projects</h3>
            <p className="text-white/70">Manage your projects and track progress</p>
            <a href="/dashboard/projects" className="mt-4 inline-block text-indigo-400 hover:text-indigo-300">
              View Projects
            </a>
          </div>
          
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h3 className="text-lg font-medium text-white mb-2">Analytics</h3>
            <p className="text-white/70">View insights and performance metrics</p>
            <a href="/dashboard/analytics" className="mt-4 inline-block text-indigo-400 hover:text-indigo-300">
              View Analytics
            </a>
          </div>
          
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h3 className="text-lg font-medium text-white mb-2">Profile</h3>
            <p className="text-white/70">Update your account information</p>
            <a href="/dashboard/profile" className="mt-4 inline-block text-indigo-400 hover:text-indigo-300">
              Edit Profile
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;