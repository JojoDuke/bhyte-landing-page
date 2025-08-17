"use client";

// Smooth scroll function for services section
const scrollToServices = () => {
  const element = document.getElementById('services');
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Bhyte Studio</h3>
            <p className="text-gray-400 mb-4">
              AI-first and design driven product studio shaping the next wave of software.
            </p>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={scrollToServices} className="hover:text-white transition text-left cursor-pointer">Web Development</button></li>
              <li><button onClick={scrollToServices} className="hover:text-white transition text-left cursor-pointer">AI SaaS & AI Automation</button></li>
              <li><button onClick={scrollToServices} className="hover:text-white transition text-left cursor-pointer">UI/UX Design</button></li>
              <li><button onClick={scrollToServices} className="hover:text-white transition text-left cursor-pointer">Brand Identity & Strategy</button></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a 
                  href="https://cal.com/bhyte-lwy0r0/30min?overlayCalendar=true" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition"
                >
                  Book a Call
                </a>
              </li>
              <li>
                <a 
                  href="mailto:bhyte.llc@gmail.com" 
                  className="hover:text-white transition"
                >
                  Email Us at bhyte.llc@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="mailto:bhyte.llc@gmail.com" 
                  className="hover:text-white transition"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 Bhyte Studio. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</a>
            <a href="/terms" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 