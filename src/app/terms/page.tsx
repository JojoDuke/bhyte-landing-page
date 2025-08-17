import Footer from '../components/Footer';

export default function Terms() {
  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent leading-tight">
            Terms of Service
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
              <a href="#acceptance" className="text-blue-400 hover:text-blue-300">1. Acceptance of Terms</a>
              <a href="#description" className="text-blue-400 hover:text-blue-300">2. Description of Service</a>
              <a href="#accounts" className="text-blue-400 hover:text-blue-300">3. Client Accounts and Registration</a>
              <a href="#third-party" className="text-blue-400 hover:text-blue-300">4. Third-Party Integrations</a>
              <a href="#responsibilities" className="text-blue-400 hover:text-blue-300">5. User Responsibilities</a>
              <a href="#prohibited" className="text-blue-400 hover:text-blue-300">6. Prohibited Uses</a>
              <a href="#intellectual" className="text-blue-400 hover:text-blue-300">7. Intellectual Property Rights</a>
              <a href="#availability" className="text-blue-400 hover:text-blue-300">8. Service Availability</a>
              <a href="#liability" className="text-blue-400 hover:text-blue-300">9. Limitation of Liability</a>
              <a href="#termination" className="text-blue-400 hover:text-blue-300">10. Termination</a>
              <a href="#governing" className="text-blue-400 hover:text-blue-300">11. Governing Law</a>
              <a href="#contact" className="text-blue-400 hover:text-blue-300">12. Contact Information</a>
            </div>
          </div>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            
            <section id="acceptance">
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                Welcome to Bhyte Studio. These Terms and Conditions govern your use of our website, platform, and services. By accessing or using our Service, you agree to be bound by these Terms and our Privacy Policy.
              </p>
              <p className="mb-4">
                If you do not agree to these Terms, please do not use our Service. We may update these Terms from time to time, and your continued use constitutes acceptance of any changes.
              </p>
            </section>

            <section id="description">
              <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
              <p className="mb-4">
                Bhyte Studio provides comprehensive digital services including web development, AI automation, UI/UX design, and brand identity solutions. Our services include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Web Development:</strong> Custom websites and web applications</li>
                <li><strong>AI SaaS & Automation:</strong> AI-powered software solutions and business automation</li>
                <li><strong>UI/UX Design:</strong> User interface and experience design services</li>
                <li><strong>Brand Identity & Strategy:</strong> Branding and strategic consulting services</li>
              </ul>
              <p>
                We reserve the right to modify, suspend, or discontinue any part of our Service at any time with reasonable notice to clients.
              </p>
            </section>

            <section id="accounts">
              <h2 className="text-2xl font-bold text-white mb-4">3. Client Accounts and Registration</h2>
              <p className="mb-4">
                To engage our services, you may need to provide account information and project details. You agree to provide accurate information, maintain confidentiality of any shared credentials, and be responsible for all activities under your account.
              </p>
              <p className="mb-4">
                You must be at least 18 years old to engage our services. If using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
              </p>
            </section>

            <section id="third-party">
              <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Integrations</h2>
              <p className="mb-4">
                Our services may integrate with third-party platforms and tools to provide enhanced functionality. By using our services, you acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>You may need valid accounts with third-party services (Google, AWS, etc.)</li>
                <li>You authorize necessary integrations as described in project specifications</li>
                <li>Third-party services have their own terms and privacy policies</li>
                <li>We comply with all applicable third-party service requirements</li>
              </ul>
            </section>

            <section id="responsibilities">
              <h2 className="text-2xl font-bold text-white mb-4">5. User Responsibilities</h2>
              <p className="mb-4">As a client, you are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Accurate Information:</strong> Providing complete and accurate project requirements</li>
                <li><strong>Timely Communication:</strong> Responding to requests for feedback and approvals promptly</li>
                <li><strong>Payment Compliance:</strong> Making payments according to agreed schedules</li>
                <li><strong>Content Responsibility:</strong> Ensuring all provided content is legal and properly licensed</li>
                <li><strong>Professional Conduct:</strong> Maintaining respectful and professional communication</li>
              </ul>
              <p>
                You retain ownership of your data but grant us necessary licenses to provide our services as described in these Terms.
              </p>
            </section>

            <section id="prohibited">
              <h2 className="text-2xl font-bold text-white mb-4">6. Prohibited Uses</h2>
              <p className="mb-4">You may not use our services for:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Illegal Activities:</strong> Any unlawful purposes or activities</li>
                <li><strong>Harmful Content:</strong> Creating or distributing malicious, offensive, or harmful content</li>
                <li><strong>IP Violations:</strong> Infringing on intellectual property rights of others</li>
                <li><strong>System Interference:</strong> Attempting to compromise or disrupt our services</li>
                <li><strong>Unauthorized Access:</strong> Gaining unauthorized access to systems or data</li>
                <li><strong>Spam or Fraud:</strong> Creating spam, fraudulent, or deceptive content</li>
              </ul>
              <p>
                We reserve the right to suspend or terminate services for violations of these prohibited uses.
              </p>
            </section>

            <section id="intellectual">
              <h2 className="text-2xl font-bold text-white mb-4">7. Intellectual Property Rights</h2>
              <p className="mb-4">
                Intellectual property ownership is clearly defined in our service agreements:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Client Ownership:</strong> Upon full payment, you own final deliverables created specifically for your project</li>
                <li><strong>Our Retained Rights:</strong> We retain rights to general methodologies, techniques, and proprietary tools</li>
                <li><strong>Portfolio Rights:</strong> You grant us the right to showcase work in portfolios and marketing materials</li>
                <li><strong>Pre-existing IP:</strong> All pre-existing intellectual property remains with original owners</li>
                <li><strong>Third-party Licenses:</strong> Some projects may include third-party licensed components</li>
              </ul>
            </section>

            <section id="availability">
              <h2 className="text-2xl font-bold text-white mb-4">8. Service Availability and Modifications</h2>
              <p className="mb-4">
                We strive to provide reliable services but cannot guarantee 100% availability. We may experience:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Scheduled Maintenance:</strong> Planned service interruptions with advance notice</li>
                <li><strong>Technical Issues:</strong> Unexpected outages or performance issues</li>
                <li><strong>Service Updates:</strong> Feature modifications or improvements</li>
                <li><strong>Capacity Limits:</strong> Temporary restrictions during high-demand periods</li>
              </ul>
              <p>
                We are not liable for losses resulting from service interruptions. We recommend maintaining backups of important data and systems.
              </p>
            </section>

            <section id="liability">
              <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
              <div className="bg-gray-900 rounded-lg p-6 mb-4">
                <p className="font-bold text-yellow-400 mb-2">IMPORTANT LEGAL NOTICE:</p>
                <p className="mb-4">
                  <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Our services are provided "AS IS" without warranties of any kind</li>
                  <li>We disclaim all warranties, express or implied, including merchantability and fitness for purpose</li>
                  <li>We are not liable for indirect, incidental, special, or consequential damages</li>
                  <li>Our total liability shall not exceed amounts paid for services in the preceding 12 months</li>
                </ul>
              </div>
              <p>
                Some jurisdictions may not allow these limitations, so they may not apply to you. We maintain professional liability insurance where required.
              </p>
            </section>

            <section id="termination">
              <h2 className="text-2xl font-bold text-white mb-4">10. Termination</h2>
              <p className="mb-4">
                Either party may terminate service agreements under specified conditions:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Client Termination:</strong> You may terminate with written notice as specified in project agreements</li>
                <li><strong>Our Termination Rights:</strong> We may suspend services for Terms violations with reasonable notice</li>
                <li><strong>Payment Obligations:</strong> All payments for completed work remain due upon termination</li>
                <li><strong>Data Handling:</strong> We will provide completed deliverables and handle data according to our Privacy Policy</li>
              </ul>
              <p>
                Upon termination, your right to use our services ceases, and confidentiality obligations continue as specified in agreements.
              </p>
            </section>

            <section id="governing">
              <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
              <p className="mb-4">
                These Terms are governed by applicable laws in our jurisdiction. Dispute resolution follows this process:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Good Faith Negotiation:</strong> We first attempt to resolve disputes through direct communication</li>
                <li><strong>Mediation:</strong> If needed, disputes may be resolved through professional mediation</li>
                <li><strong>Legal Proceedings:</strong> Unresolved disputes will be handled in appropriate courts</li>
              </ul>
              <p>
                If any provision is found unenforceable, the remaining provisions will continue to be valid and enforceable.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-bold text-white mb-4">12. Contact Information</h2>
              <p className="mb-4">
                If you have questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-900 rounded-lg p-6">
                <ul className="list-none space-y-2">
                  <li><strong>Legal Inquiries:</strong> <a href="mailto:bhyte.llc@gmail.com" className="text-blue-400 hover:text-blue-300">bhyte.llc@gmail.com</a></li>
                  <li><strong>General Support:</strong> <a href="mailto:bhyte.llc@gmail.com" className="text-blue-400 hover:text-blue-300">bhyte.llc@gmail.com</a></li>
                  <li><strong>Business Name:</strong> Bhyte Studio</li>
                </ul>
              </div>
              <p className="mt-4">
                We will respond to legal inquiries within 5 business days. For technical support and project inquiries, please use our general contact email for faster assistance.
              </p>
            </section>

          </div>
        </div>
      </div>
      
      {/* Footer Component */}
      <Footer />
    </div>
  );
}
