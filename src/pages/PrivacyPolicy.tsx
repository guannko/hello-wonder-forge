import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Privacy Policy - Brain Index"
        description="Learn how Brain Index protects your data and respects your privacy."
      />
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-muted-foreground">Last updated: November 17, 2025</p>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p>
              Brain Index collects information that you provide directly to us, including when you create an account,
              use our services, or communicate with us. This may include your name, email address, company information,
              and payment details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Analyze usage patterns and trends</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against
              unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services and fulfill
              the purposes outlined in this privacy policy, unless a longer retention period is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Export your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@brainindex.com
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
