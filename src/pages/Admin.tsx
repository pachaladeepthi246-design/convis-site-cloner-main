import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Briefcase, Users, MessageSquare, TrendingUp } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { supabase } from '../lib/supabase';

export default function Admin() {
  const [stats, setStats] = useState({
    services: 0,
    blogPosts: 0,
    careers: 0,
    contactSubmissions: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [services, blogPosts, careers, contactSubmissions] = await Promise.all([
      supabase.from('services').select('*', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
      supabase.from('careers').select('*', { count: 'exact', head: true }),
      supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
    ]);

    setStats({
      services: services.count || 0,
      blogPosts: blogPosts.count || 0,
      careers: careers.count || 0,
      contactSubmissions: contactSubmissions.count || 0,
    });
  };

  const statCards = [
    {
      icon: Briefcase,
      title: 'Services',
      value: stats.services,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FileText,
      title: 'Blog Posts',
      value: stats.blogPosts,
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Users,
      title: 'Job Openings',
      value: stats.careers,
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: MessageSquare,
      title: 'Contact Submissions',
      value: stats.contactSubmissions,
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-xl text-white/70 mb-12">
            Manage your CMS content and monitor platform activity
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((card, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <GlassCard className="p-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                  <card.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white/70 text-sm font-semibold mb-1">{card.title}</h3>
                <p className="text-4xl font-bold text-white">{card.value}</p>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <AnimatedSection delay={0.2}>
            <GlassCard className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Services Management</h2>
              </div>
              <p className="text-white/70 mb-6">
                Create, edit, and manage your service offerings. Control which services are displayed on the website.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full backdrop-blur-xl bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold border border-white/30 transition-all"
              >
                Manage Services
              </motion.button>
            </GlassCard>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <GlassCard className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Blog Management</h2>
              </div>
              <p className="text-white/70 mb-6">
                Write and publish blog posts. Manage categories, tags, and featured images for your content.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full backdrop-blur-xl bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold border border-white/30 transition-all"
              >
                Manage Blog
              </motion.button>
            </GlassCard>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <GlassCard className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Career Management</h2>
              </div>
              <p className="text-white/70 mb-6">
                Post job openings, manage applications, and track hiring progress for your organization.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full backdrop-blur-xl bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold border border-white/30 transition-all"
              >
                Manage Careers
              </motion.button>
            </GlassCard>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <GlassCard className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Contact Submissions</h2>
              </div>
              <p className="text-white/70 mb-6">
                View and respond to contact form submissions. Track inquiry status and manage communications.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full backdrop-blur-xl bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold border border-white/30 transition-all"
              >
                View Submissions
              </motion.button>
            </GlassCard>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.6}>
          <GlassCard className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Quick Stats</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-white/60 text-sm mb-1">Active Services</p>
                <p className="text-3xl font-bold text-white">{stats.services}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Published Posts</p>
                <p className="text-3xl font-bold text-white">{stats.blogPosts}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Open Positions</p>
                <p className="text-3xl font-bold text-white">{stats.careers}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">New Inquiries</p>
                <p className="text-3xl font-bold text-white">{stats.contactSubmissions}</p>
              </div>
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </div>
  );
}
