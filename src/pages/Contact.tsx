import { Mail, Phone, MapPin } from 'lucide-react';
import { AnimatedSectionWrapper } from '../components/AnimatedSectionWrapper';

const ContactForm = () => {
  return (
    <form className="grid grid-cols-1 gap-6">
      <input
        type="text"
        placeholder="Your Name"
        className="w-full rounded-md border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/60 focus:border-white/50 focus:outline-none focus:ring-0"
      />
      <input
        type="email"
        placeholder="Your Email"
        className="w-full rounded-md border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/60 focus:border-white/50 focus:outline-none focus:ring-0"
      />
      <textarea
        placeholder="Your Message"
        rows={5}
        className="w-full rounded-md border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/60 focus:border-white/50 focus:outline-none focus:ring-0"
      />
      <button
        type="submit"
        className="rounded-md bg-white px-6 py-3 font-semibold text-slate-900 transition-colors hover:bg-slate-200"
      >
        Send Message
      </button>
    </form>
  );
};

const Contact = () => {
  return (
    <main>
      <AnimatedSectionWrapper id="contact-hero">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Get in Touch
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-white/70">
            We’d love to hear from you. Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
      </AnimatedSectionWrapper>
      <AnimatedSectionWrapper id="contact-form">
        <div className="container mx-auto grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-bold text-white">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-white/80" />
                <span className="text-lg text-white">hello@clyrox.com</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-white/80" />
                <span className="text-lg text-white">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-white/80" />
                <span className="text-lg text-white">123 Innovation Drive, Tech City</span>
              </div>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </AnimatedSectionWrapper>
    </main>
  );
};

export default Contact;