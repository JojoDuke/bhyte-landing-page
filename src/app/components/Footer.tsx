export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Bhyte Studio</h3>
            <p className="text-gray-400 mb-4">
              AI-first and design driven product studio shaping the next wave of software.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-white transition">Twitter</button>
              <button className="text-gray-400 hover:text-white transition">LinkedIn</button>
              <button className="text-gray-400 hover:text-white transition">GitHub</button>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">AI Development</a></li>
              <li><a href="#" className="hover:text-white transition">SaaS Products</a></li>
              <li><a href="#" className="hover:text-white transition">Design Systems</a></li>
              <li><a href="#" className="hover:text-white transition">Consulting</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Book a Call</a></li>
              <li><a href="#" className="hover:text-white transition">Email Us</a></li>
              <li><a href="#" className="hover:text-white transition">Support</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 Bhyte Studio. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 