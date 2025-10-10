import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Briefcase, Clock, Calendar, ArrowLeft } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  description: string;
  created_at: string;
}

export default function CareerDetail() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Career | null>(null);

  useEffect(() => {
    if (id) {
      loadJob();
    }
  }, [id]);

  const loadJob = async () => {
    const { data } = await supabase.from('careers').select('*').eq('id', id).single();
    if (data) setJob(data);
  };

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageHero
        title={job.title}
        subtitle={`${job.department} • ${job.location}`}
        image="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <GlassCard className="p-8 md:p-12">
              <div className="flex flex-wrap gap-x-8 gap-y-4 text-white/70 mb-8">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{job.employment_type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Posted on {new Date(job.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="prose prose-invert max-w-none text-white/80 text-lg leading-relaxed">
                <p>{job.description}</p>
              </div>

              <div className="mt-12 border-t border-white/20 pt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <motion.a
                  href="/career"
                  whileHover={{ x: -5 }}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Open Positions
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block backdrop-blur-xl bg-white text-slate-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/90 transition-all"
                >
                  Apply Now
                </motion.a>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}