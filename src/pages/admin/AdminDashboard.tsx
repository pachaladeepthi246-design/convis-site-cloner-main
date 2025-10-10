import { useEffect, useState } from 'react';
import { FileText, Briefcase, Users, MessageSquare, ArrowRight } from 'lucide-react';
import AnimatedSection from '../../components/AnimatedSection';
import GlassCard from '../../components/GlassCard';
import { supabase, ContactSubmission, BlogPost } from '../../lib/supabase';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    blogPosts: 0,
    careers: 0,
    contactSubmissions: 0,
  });
  const [recentSubmissions, setRecentSubmissions] = useState<ContactSubmission[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const [services, blogPosts, careers, contactSubmissions, recentSubmissionsData, recentPostsData] =
      await Promise.all([
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('careers').select('*', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(3),
        supabase.from('blog_posts').select('*').order('published_at', { ascending: false }).limit(3),
      ]);

    setStats({
      services: services.count || 0,
      blogPosts: blogPosts.count || 0,
      careers: careers.count || 0,
      contactSubmissions: contactSubmissions.count || 0,
    });
    if (recentSubmissionsData.data) setRecentSubmissions(recentSubmissionsData.data);
    if (recentPostsData.data) setRecentPosts(recentPostsData.data);
  };

  const statCards = [
    { icon: Briefcase, title: 'Services', value: stats.services, color: 'from-blue-500 to-cyan-500' },
    { icon: FileText, title: 'Blog Posts', value: stats.blogPosts, color: 'from-purple-500 to-pink-500' },
    { icon: Users, title: 'Job Openings', value: stats.careers, color: 'from-green-500 to-emerald-500' },
    {
      icon: MessageSquare,
      title: 'Contact Submissions',
      value: stats.contactSubmissions,
      color: 'from-orange-500 to-red-500',
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <>
      <AnimatedSection>
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-white/70 mb-8">An overview of your platform's activity.</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card, index) => (
          <AnimatedSection key={index} delay={index * 0.1}>
            <GlassCard className="p-6">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}
              >
                <card.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white/70 text-sm font-semibold mb-1">{card.title}</h3>
              <p className="text-4xl font-bold text-white">{card.value}</p>
            </GlassCard>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.4} className="mb-8">
        <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <AnimatedSection delay={0.5}>
          <GlassCard className="p-6 h-full">
            <h3 className="text-xl font-bold text-white mb-4">Latest Submissions</h3>
            <div className="space-y-3">
              {recentSubmissions.length > 0 ? (
                recentSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex justify-between items-center bg-white/5 p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-white">{submission.name}</p>
                      <p className="text-xs text-white/60">{submission.email}</p>
                    </div>
                    <span className="text-sm text-white/70">{formatDate(submission.created_at)}</span>
                  </div>
                ))
              ) : (
                <p className="text-white/60">No new submissions.</p>
              )}
            </div>
            <Link to="/admin/submissions" className="inline-flex items-center gap-2 text-sm text-primary-light hover:text-white mt-4">
              View All Submissions <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </AnimatedSection>
        <AnimatedSection delay={0.6}>
          <GlassCard className="p-6 h-full">
            <h3 className="text-xl font-bold text-white mb-4">Recent Blog Posts</h3>
            <div className="space-y-3">
              {recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <div key={post.id} className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                    <div>
                      <p className="font-semibold text-white truncate max-w-xs">{post.title}</p>
                      <p className="text-xs text-white/60">{post.category}</p>
                    </div>
                    <Link to={`/admin/blog/edit/${post.id}`} className="text-sm text-primary-light hover:text-white">
                      Edit
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-white/60">No recent posts.</p>
              )}
            </div>
            <Link to="/admin/blog" className="inline-flex items-center gap-2 text-sm text-primary-light hover:text-white mt-4">
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </AnimatedSection>
      </div>
    </>
  );
}