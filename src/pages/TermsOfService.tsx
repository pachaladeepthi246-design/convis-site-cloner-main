import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';

export default function TermsOfService() {
  return (
    <div className="min-h-screen">
      <PageHero
        title="Terms of Service"
        subtitle="Please read these terms carefully"
        image="https://images.pexels.com/photos/159304/network-notebook-macbook-pro-conference-159304.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />
      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <GlassCard className="p-8 md:p-12">
              <div className="prose prose-invert max-w-none text-white/80 text-lg leading-relaxed space-y-6">
                <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                <h2>1. Agreement to Terms</h2>
                <p>
                  By using our Services, you agree to be bound by these Terms. If you don’t agree to be bound by these Terms, do not use the Services.
                </p>

                <h2>2. Privacy Policy</h2>
                <p>
                  Please refer to our Privacy Policy for information on how we collect, use and disclose information from our users. You acknowledge and agree that your use of the Services is subject to our Privacy Policy.
                </p>

                <h2>3. Changes to Terms or Services</h2>
                <p>
                  We may update the Terms at any time, in our sole discretion. If we do so, we’ll let you know either by posting the updated Terms on the Site or through other communications.
                </p>

                <h2>4. Who May Use the Services?</h2>
                <p>
                  You may use the Services only if you are 18 years or older and capable of forming a binding contract with Clyrox and are not barred from using the Services under applicable law.
                </p>

                <h2>5. Content Ownership</h2>
                <p>
                  We do not claim any ownership rights in any User Content and nothing in these Terms will be deemed to restrict any rights that you may have to use and exploit your User Content.
                </p>

                <h2>6. General Prohibitions</h2>
                <p>
                  You agree not to do any of the following: Post, upload, publish, submit or transmit any Content that infringes, misappropriates or violates a third party’s patent, copyright, trademark, trade secret, moral rights or other intellectual property rights, or rights of publicity or privacy.
                </p>

                <h2>7. Termination</h2>
                <p>
                  We may terminate your access to and use of the Services, at our sole discretion, at any time and without notice to you.
                </p>

                <h2>8. Contact Information</h2>
                <p>
                  If you have any questions about these Terms or the Services, please contact us at legal@clyrox.com.
                </p>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}