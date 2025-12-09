'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';

export default function Intelligence() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('system');

  const sidebarItems = [
    { id: '01', label: 'SYSTEM', sectionId: 'system' },
    { id: '02', label: 'PERFORMANCE', sectionId: 'performance' },
    { id: '03', label: 'TECHNOLOGY', sectionId: 'technology' },
    { id: '04', label: 'AI TEAM', sectionId: 'ai-team' },
    { id: '05', label: 'INTEGRATIONS', sectionId: 'integrations' },
    { id: '06', label: 'PRICING', sectionId: 'pricing' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if we've reached the CTA section to hide sidebar
      const pricingSection = document.getElementById('pricing');
      let shouldShowSidebar = currentScrollY > 100;
      
      if (pricingSection) {
        const pricingSectionBottom = pricingSection.offsetTop + pricingSection.offsetHeight;
        // Hide sidebar when we've scrolled past the pricing section (reached CTA)
        if (currentScrollY + window.innerHeight > pricingSectionBottom + 100) {
          shouldShowSidebar = false;
        }
      }
      
      setShowSidebar(shouldShowSidebar);
      
      // Track navbar visibility (same logic as in Navbar component)
      if (currentScrollY < 10) {
        setIsNavbarVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
      
      // Scroll spy - determine which section is currently in view
      const sections = ['system', 'performance', 'technology', 'ai-team', 'integrations', 'pricing'];
      const scrollPosition = currentScrollY + 200; // Offset for better detection
      
      let currentSection = 'system'; // default
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + currentScrollY;
          
          if (scrollPosition >= elementTop) {
            currentSection = sectionId;
          }
        }
      }
      
      setActiveSection(currentSection);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="min-h-screen pt-16" style={{background: 'radial-gradient(circle, rgb(147, 51, 234), rgb(31, 41, 55))'}}>
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-6xl font-bold text-white">Bhyte Intelligence</h1>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed left-0 h-full w-64 bg-gray-900 border-r border-gray-700 transition-all duration-300 z-40 ${
        showSidebar ? 'translate-x-0' : '-translate-x-full'
      } ${
        isNavbarVisible ? 'top-16' : 'top-0'
      }`}>
        <div className="p-6 pt-8">
          {sidebarItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center py-3 px-4 mb-2 cursor-pointer transition-colors ${
                activeSection === item.sectionId
                  ? 'bg-gray-800 text-white border-l-2 border-purple-500' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
              onClick={() => {
                const element = document.getElementById(item.sectionId);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className="text-sm font-mono mr-4">{item.id}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${showSidebar ? 'ml-64' : 'ml-0'}`}>
        {/* System Section */}
        <section id="system" className="min-h-screen bg-gray-900 px-8 py-16">
          <div className="max-w-6xl mx-auto flex items-center justify-center h-full">
            <h2 className="text-4xl font-bold text-center">01 - System</h2>
          </div>
        </section>

        {/* Performance Section */}
        <section id="performance" className="min-h-screen bg-gray-800 px-8 py-16">
          <div className="max-w-6xl mx-auto flex items-center justify-center h-full">
            <h2 className="text-4xl font-bold text-center">02 - Performance</h2>
          </div>
        </section>

        {/* Technology Section */}
        <section id="technology" className="min-h-screen bg-gray-900 px-8 py-16">
          <div className="max-w-6xl mx-auto flex items-center justify-center h-full">
            <h2 className="text-4xl font-bold text-center">03 - Technology</h2>
          </div>
        </section>

        {/* AI Team Section */}
        <section id="ai-team" className="min-h-screen bg-gray-800 px-8 py-16">
          <div className="max-w-6xl mx-auto flex items-center justify-center h-full">
            <h2 className="text-4xl font-bold text-center">04 - AI Team</h2>
          </div>
        </section>

        {/* Integrations Section */}
        <section id="integrations" className="min-h-screen bg-gray-900 px-8 py-16">
          <div className="max-w-6xl mx-auto flex items-center justify-center h-full">
            <h2 className="text-4xl font-bold text-center">05 - Integrations</h2>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="min-h-screen bg-gray-800 px-8 py-16">
          <div className="max-w-6xl mx-auto flex items-center justify-center h-full">
            <h2 className="text-4xl font-bold text-center">06 - Pricing</h2>
          </div>
        </section>
      </div>
      
      {/* Call to Action - Outside sidebar layout */}
      <CallToAction />
      
      {/* Footer */}
      <Footer />
    </div>
    </>
  );
} 