import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Account Information</h2>
        <p className="text-white/70">Email: {user?.email}</p>
        {/* Add profile editing UI here */}
      </div>
    </div>
  );
};

export default Profile;