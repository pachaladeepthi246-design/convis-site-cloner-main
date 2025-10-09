import { useEffect, useState } from 'react';
import { MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { supabase, Career } from '../lib/supabase';

export default function CareerPage() {
  const [careers, setCareers] = useState<Career[]>([]);

  useEffect(() => {
    loadCareers();
  }, []);

  const loadCareers = async () => {
    const { data } = await supabase
      .from('careers')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (data) setCareers(data);
  };

  return (
    <div className="min-h-screen">
      <PageHero
        title="Join Our Team"
        subtitle="Build your career with us and make an impact"
        image="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Work With Us?</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Join a team of passionate professionals dedicated to excellence and innovation
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[
              {
                title: 'Growth Opportunities',
                description: 'Continuous learning and career development programs',
                icon: '📈',
              },
              {
                title: 'Work-Life Balance',
                description: 'Flexible schedules and remote work options',
                icon: '⚖️',
              },
              {
                title: 'Competitive Benefits',
                description: 'Comprehensive health coverage and retirement plans',
                icon: '💼',
              },
            ].map((benefit, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <GlassCard className="p-8 text-center">
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-white/70">{benefit.description}</p>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">Open Positions</h2>
          </AnimatedSection>

          {careers.length === 0 ? (
            <AnimatedSection>
              <GlassCard className="p-12 text-center">
                <p className="text-xl text-white/70">
                  We don't have any open positions at the moment, but we're always looking for talented
                  individuals. Feel free to send us your resume at careers@clyrox.com
                </p>
              </GlassCard>
            </AnimatedSection>
          ) : (
            <div className="space-y-6">
              {careers.map((job, index) => (
                <AnimatedSection key={job.id} delay={index * 0.05}>
                  <GlassCard className="p-8 hover:bg-white/15 transition-all">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold text-white mb-3">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-white/70">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{job.employment_type}</span>
                          </div>
                        </div>
                        {job.description && (
                          <p className="text-white/70 mt-4 line-clamp-2">{job.description}</p>
                        )}
                      </div>
                      <a
                        href={`/career/${job.id}`}
                        className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold border border-white/30 transition-all whitespace-nowrap"
                      >
                        View Details <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </GlassCard>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-800 to-black">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Don't See the Right Position?
            </h2>
            <p className="text-xl text-white/70 mb-10">
              We're always interested in meeting talented individuals. Send us your resume and let's talk.
            </p>
            <a
              href="/contact"
              className="inline-block backdrop-blur-xl bg-white text-slate-900 px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/90 transition-all"
            >
              Get in Touch
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
