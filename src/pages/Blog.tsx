import { useEffect, useState } from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { supabase, BlogPost } from '../lib/supabase';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadPosts();
  }, [selectedCategory]);

  const loadPosts = async () => {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (selectedCategory !== 'all') {
      query = query.eq('category', selectedCategory);
    }

    const { data } = await query;
    if (data) setPosts(data);
  };

  const categories = ['all', 'Business', 'Employment', 'Immigration', 'Technology', 'Industry News'];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen">
      <PageHero
        title="Our Blog"
        subtitle="Insights, tips, and industry news from our experts"
        image="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-black">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    selectedCategory === category
                      ? 'backdrop-blur-xl bg-white text-slate-900'
                      : 'backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {posts.length === 0 ? (
            <AnimatedSection>
              <GlassCard className="p-12 text-center">
                <p className="text-xl text-white/70">
                  No blog posts available at the moment. Check back soon for updates!
                </p>
              </GlassCard>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <AnimatedSection key={post.id} delay={index * 0.05}>
                  <GlassCard className="overflow-hidden h-full flex flex-col">
                    {post.featured_image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-grow flex flex-col">
                      {post.category && (
                        <div className="flex items-center gap-2 mb-3">
                          <Tag className="w-4 h-4 text-white/60" />
                          <span className="text-sm text-white/60">{post.category}</span>
                        </div>
                      )}
                      <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2">{post.title}</h3>
                      {post.excerpt && <p className="text-white/70 mb-4 flex-grow line-clamp-3">{post.excerpt}</p>}
                      <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.published_at)}</span>
                        </div>
                      </div>
                      <a
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-white hover:gap-4 transition-all font-semibold"
                      >
                        Read More <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </GlassCard>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}