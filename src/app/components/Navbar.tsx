"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  // Determine active item based on current path
  const getActiveItem = () => {
    if (pathname === '/labs') return 'labs';
    if (pathname === '/intelligence') return 'intelligence';
    return 'studio'; // default to studio for home page and /studio
  };
  
  const activeItem = getActiveItem();
  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="flex items-center h-16">
        {/* Logo - Far Left */}
        <Link href="/" className="text-white font-bold text-lg pl-4">
          Bhyte
        </Link>
        
        {/* Navigation Items */}
        <div className="flex items-center h-16" style={{ marginLeft: '60px' }}>
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
      </div>
    </nav>
  );
} 