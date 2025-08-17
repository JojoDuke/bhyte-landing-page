import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent leading-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-lg">
            Last updated: January 2025
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          
          {/* Table of Contents */}
          <div className="mb-12 bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Table of Contents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <a href="#introduction" className="text-blue-400 hover:text-blue-300">1. Introduction</a>
              <a href="#information-collection" className="text-blue-400 hover:text-blue-300">2. Information Collection</a>
              <a href="#data-usage" className="text-blue-400 hover:text-blue-300">3. How We Use Your Data</a>
              <a href="#data-sharing" className="text-blue-400 hover:text-blue-300">4. Data Sharing and Disclosure</a>
              <a href="#data-security" className="text-blue-400 hover:text-blue-300">5. Data Protection and Security</a>
              <a href="#data-retention" className="text-blue-400 hover:text-blue-300">6. Data Retention and Deletion</a>
              <a href="#third-party" className="text-blue-400 hover:text-blue-300">7. Third-Party Services</a>
              <a href="#user-rights" className="text-blue-400 hover:text-blue-300">8. Your Rights and Controls</a>
              <a href="#contact" className="text-blue-400 hover:text-blue-300">9. Contact Information</a>
            </div>
          </div>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            
            <section id="introduction">
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p className="mb-4">
                At Bhyte Studio, we are committed to protecting your privacy and handling your data responsibly. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website and services.
              </p>
              <p className="mb-4">
                By using our services, you consent to the collection and use of information in accordance with this policy. We comply with applicable data protection laws and industry best practices.
              </p>
              <p>
                <strong>Our Commitment:</strong> We prioritize transparency and data minimization, collecting only the information necessary to provide our web development, AI automation, design, and branding services.
              </p>
            </section>

            <section id="information-collection">
              <h2 className="text-2xl font-bold text-white mb-4">2. Information Collection</h2>
              <p className="mb-4">
                We collect information you provide directly to us through various interactions:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Contact Forms:</strong> Name, email address, phone number, company information</li>
                <li><strong>Consultation Requests:</strong> Project details, business requirements, timeline preferences</li>
                <li><strong>Service Communications:</strong> Project feedback, change requests, approval confirmations</li>
                <li><strong>Website Analytics:</strong> Usage patterns, page views, device information (anonymized)</li>
                <li><strong>Cal.com Integration:</strong> Scheduling data when you book consultations</li>
              </ul>
              <p>
                We only collect the minimum data necessary to provide our services effectively and maintain professional client relationships.
              </p>
            </section>

            <section id="data-usage">
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h2>
              <p className="mb-4">We use your information for the following specific purposes:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Service Delivery:</strong> To provide web development, AI automation, design, and branding services</li>
                <li><strong>Project Management:</strong> To communicate project updates, deliverables, and timelines</li>
                <li><strong>Client Support:</strong> To respond to inquiries and provide technical assistance</li>
                <li><strong>Quality Improvement:</strong> To enhance our services based on client feedback</li>
                <li><strong>Legal Compliance:</strong> To meet contractual and regulatory obligations</li>
              </ul>
              <p>
                We do not use your data for advertising, marketing to third parties, or any purpose unrelated to providing our core services.
              </p>
            </section>

            <section id="data-sharing">
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing and Disclosure</h2>
              <p className="mb-4">
                We do not sell, rent, or share your personal information with third parties, except in these limited circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>With Your Consent:</strong> When you explicitly authorize specific data sharing</li>
                <li><strong>Service Providers:</strong> Trusted partners who assist in service delivery (hosting, email, scheduling)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect rights and safety</li>
                <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions, with advance notice</li>
              </ul>
              <p>
                Any third parties with access to your data are contractually bound to maintain confidentiality and data protection standards.
              </p>
            </section>

            <section id="data-security">
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Protection and Security</h2>
              <p className="mb-4">We implement comprehensive security measures to protect your information:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Encryption:</strong> Data encrypted in transit (TLS/SSL) and at rest using industry standards</li>
                <li><strong>Access Controls:</strong> Strict limitations on who can access client data</li>
                <li><strong>Secure Infrastructure:</strong> Professional-grade hosting with security monitoring</li>
                <li><strong>Regular Updates:</strong> Continuous security patches and system updates</li>
                <li><strong>Data Minimization:</strong> We collect and store only necessary information</li>
              </ul>
              <p>
                While we implement robust security measures, no internet transmission method is 100% secure. We continuously update our practices to maintain the highest security standards.
              </p>
            </section>

            <section id="data-retention">
              <h2 className="text-2xl font-bold text-white mb-4">6. Data Retention and Deletion</h2>
              <p className="mb-4">We retain your data only as long as necessary:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Active Projects:</strong> Data retained throughout project duration and warranty period</li>
                <li><strong>Completed Projects:</strong> Essential data kept for 3 years for support and legal purposes</li>
                <li><strong>Marketing Data:</strong> Retained until you opt out or request deletion</li>
                <li><strong>Legal Requirements:</strong> Some data may be retained longer if required by law</li>
              </ul>
              <p>
                You can request immediate deletion of your data by contacting us at <a href="mailto:bhyte.llc@gmail.com" className="text-blue-400 hover:text-blue-300">bhyte.llc@gmail.com</a>. We will confirm completion within 30 days.
              </p>
            </section>

            <section id="third-party">
              <h2 className="text-2xl font-bold text-white mb-4">7. Third-Party Services</h2>
              <p className="mb-4">Our website integrates with trusted third-party services:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Cal.com:</strong> For consultation scheduling and calendar management</li>
                <li><strong>Web Analytics:</strong> To understand site usage and improve user experience</li>
                <li><strong>Email Services:</strong> For client communications and project updates</li>
                <li><strong>Cloud Hosting:</strong> Secure infrastructure for website and data storage</li>
              </ul>
              <p>
                These services have their own privacy policies. We carefully vet all partners and ensure they meet our data protection standards.
              </p>
            </section>

            <section id="user-rights">
              <h2 className="text-2xl font-bold text-white mb-4">8. Your Rights and Controls</h2>
              <p className="mb-4">You have comprehensive rights regarding your personal data:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Access:</strong> Request a copy of all data we hold about you</li>
                <li><strong>Correction:</strong> Request updates to inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request removal of your personal data</li>
                <li><strong>Data Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong>Processing Limits:</strong> Request restrictions on how we use your data</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
              </ul>
              <p>
                To exercise these rights, contact us at <a href="mailto:bhyte.llc@gmail.com" className="text-blue-400 hover:text-blue-300">bhyte.llc@gmail.com</a>. We respond to all requests within 30 days.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-bold text-white mb-4">9. Contact Information</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-900 rounded-lg p-6">
                <ul className="list-none space-y-2">
                  <li><strong>Email:</strong> <a href="mailto:bhyte.llc@gmail.com" className="text-blue-400 hover:text-blue-300">bhyte.llc@gmail.com</a></li>
                  <li><strong>Privacy Inquiries:</strong> <a href="mailto:bhyte.llc@gmail.com" className="text-blue-400 hover:text-blue-300">bhyte.llc@gmail.com</a></li>
                  <li><strong>Business Name:</strong> Bhyte Studio</li>
                </ul>
              </div>
              <p className="mt-4">
                We are committed to resolving privacy concerns promptly and transparently. This Privacy Policy may be updated periodically, and we will notify users of significant changes.
              </p>
            </section>

          </div>
        </div>
      </div>
      
      {/* Footer Component with spacing */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
