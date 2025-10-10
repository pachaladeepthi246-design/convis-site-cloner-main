import { useEffect, useState } from 'react';
import { supabase, ContactSubmission } from '../../lib/supabase';
import { Trash2, Mail, Phone, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import GlassCard from '../../components/GlassCard';
import AnimatedSection from '../../components/AnimatedSection';

export default function ContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    const { data } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setSubmissions(data);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      const { error } = await supabase.from('contact_submissions').delete().eq('id', id);
      if (error) {
        toast.error('Error deleting submission: ' + error.message);
      } else {
        toast.success('Submission deleted successfully');
        loadSubmissions();
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Contact Submissions</h1>

      {submissions.length === 0 ? (
        <GlassCard className="p-8 text-center">
          <p className="text-xl text-white/70">No submissions yet.</p>
        </GlassCard>
      ) : (
        <div className="space-y-6">
          {submissions.map((submission, index) => (
            <AnimatedSection key={submission.id} delay={index * 0.05}>
              <GlassCard className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-white">{submission.name}</h2>
                    {submission.service_interest && (
                      <p className="text-primary-light font-semibold">{submission.service_interest}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(submission.id)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-md"
                  >
                    <Trash2 className="w-4 h-4 text-red-300" />
                  </button>
                </div>
                <div className="border-t border-white/10 my-4"></div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70 mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${submission.email}`} className="hover:text-white">{submission.email}</a>
                  </div>
                  {submission.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{submission.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(submission.created_at)}</span>
                  </div>
                </div>
                <p className="text-white/80 whitespace-pre-wrap">{submission.message}</p>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
}