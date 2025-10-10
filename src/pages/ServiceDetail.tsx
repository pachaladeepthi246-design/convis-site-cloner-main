import { useEffect, useState } from 'react';
import { useParams } from './hooks/useParams';
import { Briefcase, Users, Globe, Code, UserCheck, CheckCircle, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { supabase, Service } from '../lib/supabase';

const iconMap: Record<string, any> = {
  briefcase: Briefcase,
  users: Users,
  globe: Globe,
  code: Code,
  'user-check': UserCheck,
};

export default function ServiceDetail() {
  const slug = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);

  useEffect(() => {
    if (slug) {
      loadService();
      loadRelatedServices();
    }
  }, [slug]);

  const loadService = async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();
    if (data) setService(data);
  };

  const loadRelatedServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .neq('slug', slug)
      .eq('is_active', true)
      .order('order_index')
      .limit(3);
    if (data) setRelatedServices(data);
  };

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  const Icon = iconMap[service.icon] || Briefcase;

  return (
    <div className="min-h-screen">
      <PageHero title={service.title} subtitle={service.subtitle} image={service.hero_image} />

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <GlassCard className="p-12">
              <div className="backdrop-blur-xl bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                <Icon className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Overview</h2>
              <p className="text-xl text-white/70 leading-relaxed">{service.description}</p>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {service.features && service.features.length > 0 && (
        <section className="relative py-24 px-6 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Key Features</h2>
              <p className="text-xl text-white/70">What makes our service exceptional</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.features.map((feature: any, index: number) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <GlassCard className="p-8">
                    <CheckCircle className="w-12 h-12 text-emerald-400 mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-white/70 text-lg">{feature.description}</p>
                  </GlassCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Process"
                className="rounded-3xl shadow-2xl"
              />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Process</h2>
              <div className="space-y-6">
                {[
                  {
                    step: '01',
                    title: 'Initial Consultation',
                    description: 'We begin by understanding your specific needs and objectives',
                  },
                  {
                    step: '02',
                    title: 'Strategic Planning',
                    description: 'Develop a customized strategy tailored to your goals',
                  },
                  {
                    step: '03',
                    title: 'Implementation',
                    description: 'Execute the plan with precision and attention to detail',
                  },
                  {
                    step: '04',
                    title: 'Ongoing Support',
                    description: 'Provide continuous support to ensure long-term success',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="backdrop-blur-xl bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-white">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-white/70">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="relative py-24 px-6 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Related Services</h2>
              <p className="text-xl text-white/70">Explore our other offerings</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((relatedService, index) => {
                const RelatedIcon = iconMap[relatedService.icon] || Briefcase;
                return (
                  <AnimatedSection key={relatedService.id} delay={index * 0.1}>
                    <GlassCard className="p-8 h-full flex flex-col">
                      <div className="backdrop-blur-xl bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                        <RelatedIcon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{relatedService.title}</h3>
                      <p className="text-white/70 mb-6 flex-grow">{relatedService.subtitle}</p>
                      <a
                        href={`/services/${relatedService.slug}`}
                        className="inline-flex items-center gap-2 text-white hover:gap-4 transition-all"
                      >
                        Learn More <ArrowRight className="w-4 h-4" />
                      </a>
                    </GlassCard>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-black">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/70 mb-10">
              Let's discuss how {service.title.toLowerCase()} can benefit your organization
            </p>
            <a
              href="/contact"
              className="inline-block backdrop-blur-xl bg-white text-slate-900 px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/90 transition-all"
            >
              Contact Us Today
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
