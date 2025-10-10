import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

export default function NewsletterSignup() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-black">
      <div className="max-w-5xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Stay Updated</h2>
          <p className="text-xl text-white/70 mb-10">
            Subscribe to our newsletter for the latest insights and industry news.
          </p>
          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-6 py-4 rounded-full focus:outline-none focus:border-white/40"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="backdrop-blur-xl bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-all whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}