import { useEffect, useState } from 'react';
import { Briefcase, Users, Globe, Code, UserCheck, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { supabase } from '../lib/supabase';

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  hero_image: string;
  slug: string;
  is_active: boolean;
  order_index: number;
  features: any[];
}

const iconMap: Record<string, any> = {
  briefcase: Briefcase,
  users: Users,
  globe: Globe,
  code: Code,
  'user-check': UserCheck,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('order_index');
    if (data) setServices(data);
  };

  return (
    <div className="min-h-screen">
      <PageHero
        title="Our Services"
        subtitle="Comprehensive solutions to drive your success"
        image="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We offer a comprehensive range of services designed to meet your business needs at every stage of
              growth. From strategic consulting to talent acquisition, we're here to help you succeed.
            </p>
          </AnimatedSection>

          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Briefcase;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    isEven ? '' : 'lg:grid-flow-dense'
                  }`}
                >
                  <AnimatedSection delay={0.1} className={isEven ? '' : 'lg:col-start-2'}>
                    <img
                      src={service.hero_image}
                      alt={service.title}
                      className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
                    />
                  </AnimatedSection>

                  <AnimatedSection delay={0.2} className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                    <GlassCard className="p-8">
                      <div className="backdrop-blur-xl bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{service.title}</h2>
                      <p className="text-xl text-white/60 mb-6">{service.subtitle}</p>
                      <p className="text-white/70 mb-8">{service.description}</p>

                      {service.features && service.features.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                          {service.features.map((feature: any, idx: number) => (
                            <div key={idx} className="backdrop-blur-xl bg-white/5 p-4 rounded-xl">
                              <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                              <p className="text-sm text-white/60">{feature.description}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <a
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-white hover:gap-4 transition-all font-semibold"
                      >
                        Learn More <ArrowRight className="w-5 h-5" />
                      </a>
                    </GlassCard>
                  </AnimatedSection>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-black">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-xl text-white/70 mb-10">
              We understand that every business is unique. Let's discuss how we can tailor our services to your
              specific needs.
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