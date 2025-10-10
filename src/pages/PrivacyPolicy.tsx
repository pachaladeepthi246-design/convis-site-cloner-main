import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <PageHero
        title="Privacy Policy"
        subtitle="Your privacy is important to us"
        image="https://images.pexels.com/photos/238118/pexels-photo-238118.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />
      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <GlassCard className="p-8 md:p-12">
              <div className="prose prose-invert max-w-none text-white/80 text-lg leading-relaxed space-y-6">
                <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                
                <h2>1. Introduction</h2>
                <p>
                  Welcome to Clyrox. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at privacy@clyrox.com.
                </p>

                <h2>2. Information We Collect</h2>
                <p>
                  We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Website or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make and the products and features you use.
                </p>

                <h2>3. How We Use Your Information</h2>
                <p>
                  We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                </p>

                <h2>4. Will Your Information Be Shared With Anyone?</h2>
                <p>
                  We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
                </p>

                <h2>5. How Long Do We Keep Your Information?</h2>
                <p>
                  We keep your information for as long as necessary to fulfill the purposes outlined in this privacy policy unless otherwise required by law.
                </p>

                <h2>6. How Do We Keep Your Information Safe?</h2>
                <p>
                  We aim to protect your personal information through a system of organizational and technical security measures.
                </p>

                <h2>7. Do We Collect Information From Minors?</h2>
                <p>
                  We do not knowingly solicit data from or market to children under 18 years of age.
                </p>

                <h2>8. What Are Your Privacy Rights?</h2>
                <p>
                  In some regions, such as the European Economic Area (EEA) and UK, you have rights that allow you greater access to and control over your personal information.
                </p>

                <h2>9. How Can You Contact Us About This Policy?</h2>
                <p>
                  If you have questions or comments about this policy, you may email us at privacy@clyrox.com or by post to: Clyrox, 123 Business Street, Suite 100, City, State 12345.
                </p>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}