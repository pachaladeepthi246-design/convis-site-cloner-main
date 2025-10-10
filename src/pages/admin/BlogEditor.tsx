import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase, BlogPost } from '../../lib/supabase';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function BlogEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Clyrox Team',
    featured_image: '',
    category: 'Industry News',
    tags: [],
    is_published: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadPost();
    }
  }, [id]);

  const loadPost = async () => {
    const { data } = await supabase.from('blog_posts').select('*').eq('id', id).single();
    if (data) setPost(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const postData = {
      ...post,
      published_at: new Date().toISOString(),
    };

    const { error } = id
      ? await supabase.from('blog_posts').update(postData).eq('id', id)
      : await supabase.from('blog_posts').insert([postData]);

    if (error) {
      toast.error('Error saving post: ' + error.message);
    } else {
      toast.success(`Post ${id ? 'updated' : 'created'} successfully!`);
      navigate('/admin/blog');
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setPost({
      ...post,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : name === 'tags' ? value.split(',').map(tag => tag.trim()) : value,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">{id ? 'Edit Post' : 'Add New Post'}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-white mb-2 font-semibold">Title</label>
            <input type="text" name="title" value={post.title} onChange={handleChange} required className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg" />
          </div>
          <div>
            <label htmlFor="slug" className="block text-white mb-2 font-semibold">Slug</label>
            <input type="text" name="slug" value={post.slug} onChange={handleChange} required className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg" />
          </div>
        </div>
        <div>
          <label htmlFor="excerpt" className="block text-white mb-2 font-semibold">Excerpt</label>
          <textarea name="excerpt" value={post.excerpt} onChange={handleChange} rows={3} className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg" />
        </div>
        <div>
          <label htmlFor="content" className="block text-white mb-2 font-semibold">Content</label>
          <textarea name="content" value={post.content} onChange={handleChange} rows={10} className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg" />
        </div>
        <div>
          <label htmlFor="featured_image" className="block text-white mb-2 font-semibold">Featured Image URL</label>
          <input type="text" name="featured_image" value={post.featured_image} onChange={handleChange} className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="author" className="block text-white mb-2 font-semibold">Author</label>
            <input type="text" name="author" value={post.author} onChange={handleChange} className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg" />
          </div>
          <div>
            <label htmlFor="category" className="block text-white mb-2 font-semibold">Category</label>
            <select name="category" value={post.category} onChange={handleChange} className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg">
              <option value="Business">Business</option>
              <option value="Employment">Employment</option>
              <option value="Immigration">Immigration</option>
              <option value="Technology">Technology</option>
              <option value="Industry News">Industry News</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="tags" className="block text-white mb-2 font-semibold">Tags (comma-separated)</label>
          <input type="text" name="tags" value={Array.isArray(post.tags) ? post.tags.join(', ') : ''} onChange={handleChange} className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg" />
        </div>
        <div className="flex items-center gap-4">
          <input type="checkbox" name="is_published" checked={post.is_published} onChange={handleChange} className="h-5 w-5 rounded bg-white/10 border-white/20" />
          <label htmlFor="is_published" className="text-white font-semibold">Published</label>
        </div>
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Post'}
        </motion.button>
      </form>
    </div>
  );
}