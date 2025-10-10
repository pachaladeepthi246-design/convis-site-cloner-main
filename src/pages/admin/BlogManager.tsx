import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, BlogPost } from '../../lib/supabase';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
    if (data) setPosts(data);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) {
        toast.error('Error deleting post: ' + error.message);
      } else {
        toast.success('Post deleted successfully');
        loadPosts();
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Blog Posts</h1>
        <Link
          to="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-white/90 transition-all"
        >
          <Plus className="w-5 h-5" />
          New Post
        </Link>
      </div>

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg overflow-hidden">
        <table className="w-full text-left text-white/80">
          <thead className="bg-white/10">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-white/10 last:border-b-0">
                <td className="p-4">{post.title}</td>
                <td className="p-4">{post.category}</td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs ${
                      post.is_published
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-slate-500/20 text-slate-300'
                    }`}
                  >
                    {post.is_published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {post.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <Link to={`/admin/blog/edit/${post.id}`}>
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-md">
                      <Edit className="w-4 h-4" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-md"
                  >
                    <Trash2 className="w-4 h-4 text-red-300" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}