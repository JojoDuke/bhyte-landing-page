"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  
  // Determine active item based on current path
  const getActiveItem = () => {
    if (pathname === '/labs') return 'labs';
    if (pathname === '/intelligence') return 'intelligence';
    return 'studio'; // default to studio for home page and /studio
  };
  
  const activeItem = getActiveItem();

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  // Smooth scroll function for studio sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 bg-black border-b border-gray-800 transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'lg:translate-y-0 -translate-y-full' : (isVisible ? 'translate-y-0' : '-translate-y-full')
      }`}>
        <div className="flex items-center h-16">
          {/* Logo - Far Left */}
          <Link href="/" className="flex items-center pl-4 pr-2 flex-shrink-0 group">
            <div className="flex items-center justify-center h-10 w-auto">
              <Image 
                src="/logos/BhyteLogo.png" 
                alt="Bhyte Logo" 
                width={120} 
                height={40} 
                className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                priority
              />
            </div>
          </Link>
          
          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center h-16 ml-10">
            <div className="w-px h-16 bg-gray-800"></div>
            <Link 
              href="/studio" 
              className={`h-16 flex items-center text-sm font-medium transition-all duration-300 ease-in-out relative pl-5 ${
                activeItem === 'studio' 
                  ? 'text-black bg-blue-500 pr-[120px]' 
                  : 'text-gray-300 hover:text-white pr-5 hover:pr-[120px]'
              }`}
            >
              Studio
              <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[16px] border-b-[16px] border-l-transparent border-b-blue-500"></div>
            </Link>
            <div className="w-px h-16 bg-gray-800"></div>
            <Link 
              href="/labs" 
              className={`h-16 flex items-center text-sm font-medium transition-all duration-300 ease-in-out relative pl-5 ${
                activeItem === 'labs' 
                  ? 'text-black bg-red-500 pr-[120px]' 
                  : 'text-gray-300 hover:text-white pr-5 hover:pr-[120px]'
              }`}
            >
              Labs
              <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[16px] border-b-[16px] border-l-transparent border-b-red-500"></div>
            </Link>
            <div className="w-px h-16 bg-gray-800"></div>
            <Link 
              href="/intelligence" 
              className={`h-16 flex items-center text-sm font-medium transition-all duration-300 ease-in-out relative pl-5 ${
                activeItem === 'intelligence' 
                  ? 'text-black bg-purple-500 pr-[120px]' 
                  : 'text-gray-300 hover:text-white pr-5 hover:pr-[120px]'
              }`}
            >
              Intelligence
              <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[16px] border-b-[16px] border-l-transparent border-b-purple-500"></div>
            </Link>
            <div className="w-px h-16 bg-gray-800"></div>
          </div>

          {/* Mobile Tabs - Left Side */}
          <div className="flex lg:hidden items-center h-16 ml-4 flex-1">
            <div className="flex bg-gray-900 rounded-lg p-1 space-x-1">
              <Link 
                href="/studio"
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  activeItem === 'studio' 
                    ? 'bg-blue-500 text-black' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Studio
              </Link>
              <Link 
                href="/labs"
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  activeItem === 'labs' 
                    ? 'bg-red-500 text-black' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Labs
              </Link>
              <Link 
                href="/intelligence"
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  activeItem === 'intelligence' 
                    ? 'bg-purple-500 text-black' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Intelligence
              </Link>
            </div>
          </div>
          
          {/* Desktop Studio Section Navigation */}
          {(pathname === '/studio' || pathname === '/') && (
            <div className="hidden lg:flex ml-auto mr-4 items-center gap-11">
              {[
                { name: 'About', id: 'about' },
                { name: 'Services', id: 'services' },
                { name: 'Process', id: 'process' },
                { name: 'Work', id: 'work' },
                { name: 'Pricing', id: 'pricing' },
                { name: 'Contact', id: 'contact' }
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="relative px-1 py-1 text-xs text-gray-300 hover:text-black transition-all duration-200 cursor-pointer group overflow-hidden"
                  style={{
                    clipPath: 'polygon(2px 0%, 100% 0%, calc(100% - 2px) 100%, 0% 100%)'
                  }}
                >
                  <div className="absolute inset-0 bg-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out" style={{ clipPath: 'polygon(2px 0%, 100% 0%, calc(100% - 2px) 100%, 0% 100%)' }}></div>
                  <span className="relative z-10">{section.name}</span>
                </button>
              ))}
            </div>
          )}

        </div>
      </nav>

      {/* Hamburger Menu Button Bar - UNDER navbar with scroll behavior */}
      <div className={`lg:hidden fixed left-0 w-full z-40 bg-black border-b border-gray-800 flex justify-center py-3 transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'top-0' : 'top-16'
      } ${
        isMobileMenuOpen ? 'translate-y-0' : (isVisible ? 'translate-y-0' : '-translate-y-full')
      }`}>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-300 hover:text-white transition-colors"
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center relative">
            <span className={`absolute w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
            <span className={`absolute w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`absolute w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown - Full page overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-full h-screen bg-black z-30 overflow-y-auto">
          {/* Account for hamburger button height plus extra spacing */}
          <div className="pt-24 pb-6 px-6 min-h-screen">
            <div className="space-y-6">
              {((pathname === '/studio' || pathname === '/') ? [
                { name: 'About', id: 'about' },
                { name: 'Services', id: 'services' },
                { name: 'Process', id: 'process' },
                { name: 'Work', id: 'work' },
                { name: 'Pricing', id: 'pricing' },
                { name: 'Contact', id: 'contact' }
              ] : [
                { name: 'Studio', href: '/studio' },
                { name: 'Labs', href: '/labs' },
                { name: 'Intelligence', href: '/intelligence' }
              ]).map((item, index) => (
                'id' in item ? (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-xl text-gray-300 hover:text-white py-4 px-6 hover:bg-gray-800 rounded-lg transition-all duration-200 border border-gray-700"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-xl text-gray-300 hover:text-white py-4 px-6 hover:bg-gray-800 rounded-lg transition-all duration-200 border border-gray-700"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      )}




    </>
  );
} 