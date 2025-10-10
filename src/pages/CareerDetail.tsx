import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Briefcase, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { supabase, Career } from '../lib/supabase';
import { motion } from 'framer-motion';

export default function CareerDetail() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Career | null>(null);

  useEffect(() => {
    if (id) {
      loadJob();
    }
  }, [id]);

  const loadJob = async () => {
    const { data } = await supabase
      .from('careers')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();
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
              </div>

              <div className="prose prose-invert max-w-none text-white/80 text-lg leading-relaxed space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Job Description</h2>
                  <p>{job.description}</p>
                </div>

                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Responsibilities</h2>
                    <ul className="space-y-3">
                      {job.responsibilities.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.requirements && job.requirements.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Requirements</h2>
                    <ul className="space-y-3">
                      {job.requirements.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-12 border-t border-white/20 pt-8">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block backdrop-blur-xl bg-white text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all"
                >
                  Apply Now
                </motion.a>
                <motion.a
                  href="/career"
                  whileHover={{ x: -5 }}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all ml-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Careers
                </motion.a>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}