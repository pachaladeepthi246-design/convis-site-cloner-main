import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { supabase, ContactSubmission } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState<ContactSubmission>({
    name: '',
    email: '',
    phone: '',
    service_interest: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const { error } = await supabase.from('contact_submissions').insert([formData]);

      if (error) throw error;

      setSubmitMessage('Thank you for contacting us! We will get back to you shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service_interest: '',
        message: '',
      });
    } catch (error) {
      setSubmitMessage('Sorry, there was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      <PageHero
        title="Get in Touch"
        subtitle="We'd love to hear from you"
        image="https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Mail,
                title: 'Email Us',
                content: 'info@clyrox.com',
                link: 'mailto:info@clyrox.com',
              },
              {
                icon: Phone,
                title: 'Call Us',
                content: '+1 (234) 567-890',
                link: 'tel:+1234567890',
              },
              {
                icon: MapPin,
                title: 'Visit Us',
                content: '123 Business Street, Suite 100',
                link: '#',
              },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <GlassCard className="p-8 text-center h-full">
                  <div className="backdrop-blur-xl bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <a
                    href={item.link}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {item.content}
                  </a>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Send Us a Message</h2>
              <p className="text-xl text-white/70 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2 font-semibold">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-6 py-4 rounded-xl focus:outline-none focus:border-white/40"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white mb-2 font-semibold">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-6 py-4 rounded-xl focus:outline-none focus:border-white/40"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white mb-2 font-semibold">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-6 py-4 rounded-xl focus:outline-none focus:border-white/40"
                    placeholder="+1 (234) 567-890"
                  />
                </div>

                <div>
                  <label htmlFor="service_interest" className="block text-white mb-2 font-semibold">
                    Service Interest
                  </label>
                  <select
                    id="service_interest"
                    name="service_interest"
                    value={formData.service_interest}
                    onChange={handleChange}
                    className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-white/40"
                  >
                    <option value="" className="bg-slate-800">Select a service</option>
                    <option value="Business Consulting" className="bg-slate-800">Business Consulting</option>
                    <option value="Employment Consulting" className="bg-slate-800">Employment Consulting</option>
                    <option value="Visa Consulting" className="bg-slate-800">Visa Consulting</option>
                    <option value="Design & Development" className="bg-slate-800">Design & Development</option>
                    <option value="Staffing Services" className="bg-slate-800">Staffing Services</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white mb-2 font-semibold">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-6 py-4 rounded-xl focus:outline-none focus:border-white/40 resize-none"
                    placeholder="Tell us about your needs..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="w-5 h-5" />
                </motion.button>

                {submitMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl ${
                      submitMessage.includes('Thank you')
                        ? 'backdrop-blur-xl bg-primary/20 border border-primary/50 text-primary-light'
                        : 'backdrop-blur-xl bg-red-500/20 border border-red-500/50 text-red-300'
                    }`}
                  >
                    {submitMessage}
                  </motion.div>
                )}
              </form>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <GlassCard className="p-8 lg:sticky lg:top-24">
                <h3 className="text-2xl font-bold text-white mb-6">Business Hours</h3>
                <div className="space-y-4 text-white/70 mb-8">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-white">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-white">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-white">Closed</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Connect With Us</h3>
                  <p className="text-white/70 mb-6">
                    Follow us on social media for updates, insights, and industry news.
                  </p>
                  <div className="flex gap-4">
                    {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((platform) => (
                      <a
                        key={platform}
                        href="#"
                        className="backdrop-blur-xl bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all text-white"
                      >
                        {platform}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-8 mt-8">
                  <img
                    src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Office"
                    className="rounded-xl w-full"
                  />
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}