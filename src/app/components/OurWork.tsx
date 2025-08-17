"use client";
import { useEffect, useState, useRef } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const workItems = [
  { 
    src: '/portfolioImages/atlas.png', 
    title: 'Atlas Labs', 
    tech: ['AI/ML', 'React', 'Python'],
    category: 'Agency',
    url: 'https://builtwithatlas.com/'
  },
  { 
    src: '/portfolioImages/genysolutions.png', 
    title: 'Gen Y Solutions', 
    description: 'Next-generation SaaS platform streamlining complex business workflows with intelligent automation.',
    tech: ['SaaS', 'Node.js', 'Cloud'],
    category: 'Business Platform',
    url: 'https://genysolutions.tech/'
  },
  { 
    src: '/portfolioImages/midas.png', 
    title: 'Midas Financial', 
    description: 'Revolutionary fintech application providing real-time market analysis and investment insights.',
    tech: ['FinTech', 'React Native', 'Blockchain'],
    category: 'Financial Technology',
    url: 'https://usemidas.app/'
  },
  { 
    src: '/portfolioImages/intero.png', 
    title: 'Intero', 
    description: 'Comprehensive IoT management platform connecting and controlling smart devices at scale.',
    tech: ['IoT', 'Vue.js', 'AWS'],
    category: 'Real Estate',
    url: 'https://www.nickwemyssrealestate.com/'
  },
  { 
    src: '/portfolioImages/papermind.png', 
    title: 'Papermind AI', 
    description: 'Intelligent document processing system using OCR and ML for automated content extraction.',
    tech: ['AI/ML', 'Python', 'OCR'],
    category: 'Document AI',
    url: 'https://usepapermind.com/'
  },
  { 
    src: '/portfolioImages/stakenet.png', 
    title: 'Stakenet', 
    description: 'Decentralized finance platform enabling secure staking and yield farming opportunities.',
    tech: ['DeFi', 'Solidity', 'Web3'],
    category: 'Blockchain',
    url: 'https://stakenetapp.vercel.app/'
  }
];

export default function OurWork() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleProjectClick = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            setTimeout(() => setIsAnimated(true), 200);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isAnimated]);

  return (
    <section id="work" ref={sectionRef} className="bg-black text-white relative overflow-hidden">
      
      {/* Subtle Background Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,1) 100%),
            radial-gradient(ellipse 70% 50% at 30% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168, 85, 247, 0.06) 0%, transparent 50%)
          `
        }}
      ></div>
      
      <div className="pt-16 pb-32 relative z-10">
        {/* Section Heading */}
        <div className={`container mx-auto px-4 mb-20 transition-all duration-1000 ease-out ${
          isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Our Work
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Cutting-edge solutions that push the boundaries of technology. Each project represents our commitment to innovation and excellence.
            </p>
          </div>
        </div>

        {/* Work Grid */}
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workItems.map((item, index) => {
              const isHovered = hoveredCard === index;
              
              return (
                <div
                  key={index}
                  className={`group relative transition-all duration-700 ease-out cursor-pointer ${
                    isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleProjectClick(item.url)}
                >
                  {/* Main Card */}
                  <div className={`
                    relative bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden
                    backdrop-blur-sm transition-all duration-500
                    ${isHovered ? 'border-indigo-500/50 shadow-2xl shadow-indigo-500/20' : 'shadow-lg shadow-black/20'}
                  `}>
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Image Overlay */}
                      <div className={`
                        absolute inset-0 transition-opacity duration-500
                        ${isHovered ? 'opacity-60' : 'opacity-30'}
                      `} style={{
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)'
                      }}></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-indigo-600/80 backdrop-blur-sm text-sm font-medium rounded-full">
                          {item.category}
                        </span>
                      </div>
                      
                      {/* Tech Stack */}
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        {item.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-black/60 backdrop-blur-sm text-xs font-medium rounded-md border border-gray-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </h3>
                      
                      {/* Action Arrow */}
                      <div className={`
                        flex items-center text-indigo-400 font-medium text-sm
                        transition-all duration-300
                        ${isHovered ? 'translate-x-2 opacity-100' : 'translate-x-0 opacity-70'}
                      `}>
                        <span>View Project</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className={`
                      absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none
                      ${isHovered ? 'opacity-100' : 'opacity-0'}
                    `} style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 70%)'
                    }}></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* See More Button */}
          <div className="text-center mt-12">
            <button 
              onClick={() => router.push('/studio/work')}
              className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium text-lg cursor-pointer"
            >
              <span>See More</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}