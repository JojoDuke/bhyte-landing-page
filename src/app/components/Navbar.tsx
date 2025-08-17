"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
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
    <nav className={`fixed top-0 left-0 w-full z-50 bg-black border-b border-gray-800 transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="flex items-center h-16">
        {/* Logo - Far Left */}
        <Link href="/" className="text-white font-bold text-lg pl-4">
          <Image 
            src="/logos/BhyteLogo.png" 
            alt="Bhyte Logo" 
            width={100} 
            height={100} 
          />
        </Link>
        
        {/* Navigation Items */}
        <div className="flex items-center h-16" style={{ marginLeft: '40px' }}>
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
        
        {/* Studio Section Navigation - Only visible on /studio page and home page */}
        {(pathname === '/studio' || pathname === '/') && (
          <div className="ml-auto mr-4 flex items-center gap-11">
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
  );
} 