import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase, Service } from '../../lib/supabase';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ServiceEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Partial<Service>>({
    title: '',
    subtitle: '',
    slug: '',
    description: '',
    icon: 'briefcase',
    hero_image: '',
    features: [],
    order_index: 0,
    is_active: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadService();
    }
  }, [id]);

  const loadService = async () => {
    const { data } = await supabase.from('services').select('*').eq('id', id).single();
    if (data) setService(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = id
      ? await supabase.from('services').update(service).eq('id', id)
      : await supabase.from('services').insert([service]);

    if (error) {
      toast.error('Error saving service: ' + error.message);
    } else {
      toast.success(`Service ${id ? 'updated' : 'created'} successfully!`);
      navigate('/admin/services');
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const isNumber = type === 'number';
    
    setService({
      ...service,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : isNumber ? parseInt(value) : value,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">{id ? 'Edit Service' : 'Add New Service'}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-white mb-2 font-semibold">Title</label>
            <input type="text" name="title" value={service.title} onChange={handleChange} required className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg" />
          </div>
          <div>
            <label htmlFor="slug" className="block text-white mb-2 font-semibold">Slug</label>
            <input type="text" name="slug" value={service.slug} onChange={handleChange} required className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg" />
          </div>
        </div>
        <div>
          <label htmlFor="subtitle" className="block text-white mb-2 font-semibold">Subtitle</label>
          <input type="text" name="subtitle" value={service.subtitle} onChange={handleChange} className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg" />
        </div>
        <div>
          <label htmlFor="description" className="block text-white mb-2 font-semibold">Description</label>
          <textarea name="description" value={service.description} onChange={handleChange} rows={4} className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg" />
        </div>
        <div>
          <label htmlFor="hero_image" className="block text-white mb-2 font-semibold">Hero Image URL</label>
          <input type="text" name="hero_image" value={service.hero_image} onChange={handleChange} className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="icon" className="block text-white mb-2 font-semibold">Icon</label>
            <select name="icon" value={service.icon} onChange={handleChange} className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg">
              <option value="briefcase">Briefcase</option>
              <option value="users">Users</option>
              <option value="globe">Globe</option>
              <option value="code">Code</option>
              <option value="user-check">User Check</option>
            </select>
          </div>
          <div>
            <label htmlFor="order_index" className="block text-white mb-2 font-semibold">Order Index</label>
            <input type="number" name="order_index" value={service.order_index} onChange={handleChange} className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <input type="checkbox" name="is_active" checked={service.is_active} onChange={handleChange} className="h-5 w-5 rounded bg-white/10 border-white/20" />
          <label htmlFor="is_active" className="text-white font-semibold">Is Active</label>
        </div>
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Service'}
        </motion.button>
      </form>
    </div>
  );
}