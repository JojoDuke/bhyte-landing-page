"use client";
import { useEffect, useState, useRef } from "react";

export default function OurServices() {
  const [isAnimated, setIsAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            setTimeout(() => setIsAnimated(true), 200); // Slight delay for better effect
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isAnimated]);

  return (
    <section id="services" ref={sectionRef} className="bg-black text-white relative">
      {/* Separator Line */}
      <div className="border-t border-gray-800"></div>
      
      {/* Faint Metallic Grid Background */}
      <div 
        className="absolute inset-0 min-h-[2000px]"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 15%, rgba(0,0,0,0) 50%),
            linear-gradient(rgba(64, 64, 64, 0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(64, 64, 64, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 30px 30px, 30px 30px'
        }}
      ></div>
      
      <div className="pt-20 pb-20 md:pt-64 md:pb-64 relative z-10">
        {/* Section Heading */}
        <div className={`container mx-auto px-4 mb-12 md:mb-[100px] transition-all duration-1000 ease-out ${
          isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}>
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Comprehensive Solutions for Modern Digital Challenges Through Innovation and Expertise
            </h2>
          </div>
        </div>
        
        {/* Web Development (Featured) */}
        <div className="border-t border-b border-gray-800 bg-black hover:border-blue-500 transition-colors relative overflow-hidden min-h-[200px] md:h-[300px] w-full flex items-center">
          {/* Background Image positioned on the right */}
          <div 
            className="absolute top-0 left-0 w-full h-full opacity-30 md:opacity-100"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.3) 60%, transparent 100%), 
                url('/servicesDivAir.png')
              `,
              backgroundSize: 'cover, 120%',
              backgroundPosition: 'center, center',
              backgroundRepeat: 'no-repeat, no-repeat'
            }}
          ></div>
          
          <div className="px-4 md:pl-12 relative z-10 py-6 md:py-0">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-8">Web Development</h3>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl md:max-w-3xl">
              We build beautiful, responsive, and high-performance websites and web applications using the latest technologies. From simple landing pages to complex web applications, we deliver solutions that drive results.
            </p>
          </div>
        </div>
        
        {/* AI & Machine Learning */}
        <div className="border-t border-b border-gray-800 bg-black hover:border-cyan-500 transition-colors relative overflow-hidden min-h-[200px] md:h-[300px] w-full flex items-center md:justify-end">
          {/* Background Image positioned on the left */}
          <div 
            className="absolute top-0 left-0 w-full h-full opacity-30 md:opacity-100"
            style={{
              backgroundImage: `
                linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.3) 60%, transparent 100%), 
                url('/servicesDivZap.png')
              `,
              backgroundSize: 'cover, 120%',
              backgroundPosition: 'center, center',
              backgroundRepeat: 'no-repeat, no-repeat'
            }}
          ></div>
          
          <div className="px-4 md:pr-12 relative z-10 py-6 md:py-0">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-8 md:text-right">AI SaaS & AI Automation</h3>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl md:max-w-3xl md:text-right">
              With tools like n8n, Gumloop, Make, Loveable, etc, we build AI powered software products and SaaS applications as well as AI automations to help you scale and save time in managing your business.
            </p>
          </div>
        </div>
        
        {/* UI/UX Design */}
        <div className="border-t border-b border-gray-800 bg-black hover:border-indigo-500 transition-colors relative overflow-hidden min-h-[200px] md:h-[300px] w-full flex items-center">
          {/* Background Image positioned on the right */}
          <div 
            className="absolute top-0 left-0 w-full h-full opacity-30 md:opacity-100"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.3) 60%, transparent 100%), 
                url('/servicesDivStar.png')
              `,
              backgroundSize: 'cover, 120%',
              backgroundPosition: 'center, center',
              backgroundRepeat: 'no-repeat, no-repeat'
            }}
          ></div>
          
          <div className="px-4 md:pl-12 relative z-10 py-6 md:py-0">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-8">UI/UX Design</h3>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl md:max-w-3xl">
              Intuitive and engaging user interfaces that provide seamless user experiences across all devices and platforms.
            </p>
          </div>
        </div>
        
        {/* Brand Identity and Strategy */}
        <div className="border-t border-b border-gray-800 bg-black hover:border-blue-800 transition-colors relative overflow-hidden min-h-[200px] md:h-[300px] w-full flex items-center md:justify-end">
          {/* Background Image positioned on the left */}
          <div 
            className="absolute top-0 left-0 w-full h-full opacity-30 md:opacity-100"
            style={{
              backgroundImage: `
                linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.3) 60%, transparent 100%), 
                url('/servicesDivFire.png')
              `,
              backgroundSize: 'cover, 120%',
              backgroundPosition: 'center, center',
              backgroundRepeat: 'no-repeat, no-repeat'
            }}
          ></div>
          
          <div className="px-4 md:pr-12 relative z-10 py-6 md:py-0">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-8 md:text-right">Brand Identity & Strategy</h3>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl md:max-w-3xl md:text-right">
              We develop compelling brand identities and strategic frameworks that resonate with your audience and drive business growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
