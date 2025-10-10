import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Globe, Code, UserCheck, ArrowRight, CheckCircle, Target, Zap } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { supabase, Service } from '../lib/supabase';
import Testimonials from '../components/Testimonials';
import LogoCloud from '../components/LogoCloud';
import NewsletterSignup from '../components/NewsletterSignup';

const iconMap: Record<string, any> = {
  briefcase: Briefcase,
  users: Users,
  globe: Globe,
  code: Code,
  'user-check': UserCheck,
};

export default function Home() {
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

  const heroSlides = services.map((service) => ({
    title: service.title,
    subtitle: service.subtitle,
    image: service.hero_image,
    cta: 'Learn More',
    link: `/services/${service.slug}`,
  }));

  return (
    <div className="min-h-screen">
      {heroSlides.length > 0 && <HeroSlider slides={heroSlides} />}

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1920')] opacity-5 bg-cover bg-center" />

        <div className="relative max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Services</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Comprehensive solutions tailored to your business needs
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Briefcase;
              return (
                <AnimatedSection key={service.id} delay={index * 0.1}>
                  <GlassCard className="p-8 h-full flex flex-col">
                    <div className="backdrop-blur-xl bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-white/70 mb-6 flex-grow">{service.subtitle}</p>
                    <a
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-primary-light hover:gap-4 transition-all font-semibold"
                    >
                      Explore Service <ArrowRight className="w-4 h-4" />
                    </a>
                  </GlassCard>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="About Us"
                className="rounded-3xl shadow-2xl"
              />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Who We Are
              </h2>
              <p className="text-xl text-white/70 mb-8">
                We are a multi-service consulting firm dedicated to empowering businesses with innovative solutions and personalized service. Our mission is to help you navigate complexity and achieve sustainable growth.
              </p>

              <div className="space-y-4">
                {[
                  'Expert team with industry-leading experience',
                  'Tailored solutions for your unique needs',
                  'Proven track record of success',
                  '24/7 dedicated support',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-white/80 text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="/about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block mt-8 bg-primary/20 hover:bg-primary/30 text-primary-light px-8 py-4 rounded-full font-semibold border border-primary/30 transition-all"
              >
                Learn More About Us
              </motion.a>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Process</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              A systematic methodology designed to deliver exceptional results
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Discovery',
                description: 'We start by understanding your goals, challenges, and vision',
              },
              {
                icon: Zap,
                title: 'Strategy',
                description: 'Develop a comprehensive plan tailored to your specific needs',
              },
              {
                icon: CheckCircle,
                title: 'Execution',
                description: 'Implement solutions with precision and ongoing support',
              },
            ].map((step, index) => (
              <AnimatedSection key={index} delay={index * 0.15}>
                <GlassCard className="p-8 text-center">
                  <div className="backdrop-blur-xl bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-white/70">{step.description}</p>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <LogoCloud />
      <NewsletterSignup />
    </div>
  );
}