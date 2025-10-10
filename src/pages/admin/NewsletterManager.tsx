import { useEffect, useState } from 'react';
import { supabase, NewsletterSubscription } from '../../lib/supabase';
import { Trash2, Mail, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NewsletterManager() {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    const { data } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setSubscriptions(data);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      const { error } = await supabase.from('newsletter_subscriptions').delete().eq('id', id);
      if (error) {
        toast.error('Error deleting subscription: ' + error.message);
      } else {
        toast.success('Subscription deleted successfully');
        loadSubscriptions();
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Newsletter Subscribers</h1>

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg overflow-hidden">
        <table className="w-full text-left text-white/80">
          <thead className="bg-white/10">
            <tr>
              <th className="p-4 flex items-center gap-2"><Mail className="w-4 h-4" /> Email</th>
              <th className="p-4 flex items-center gap-2"><Calendar className="w-4 h-4" /> Subscribed On</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription) => (
              <tr key={subscription.id} className="border-b border-white/10 last:border-b-0">
                <td className="p-4">{subscription.email}</td>
                <td className="p-4">{formatDate(subscription.created_at)}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(subscription.id)}
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