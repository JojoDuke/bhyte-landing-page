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
    <section ref={sectionRef} className="bg-black text-white relative">
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
      
      <div className="pt-64 pb-64 relative z-10">
        {/* Section Heading */}
        <div className={`container mx-auto px-4 mb-[100px] transition-all duration-1000 ease-out ${
          isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}>
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight text-white">
              Comprehensive Solutions for <br />
              Modern Digital Challenges <br />
              Through Innovation and Expertise
            </h2>
          </div>
        </div>
        
        {/* Web Development (Featured) */}
        <div className="border-t border-b border-gray-800 bg-black hover:border-blue-500 transition-colors relative overflow-hidden h-[300px] w-full flex items-center">
          {/* Background Image positioned on the right */}
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.3) 60%, transparent 100%), 
                url('/servicesDivAir.png')
              `,
              backgroundSize: 'cover, 150%',
              backgroundPosition: 'center, -200px',
              backgroundRepeat: 'no-repeat, no-repeat'
            }}
          ></div>
          
          <div className="pl-12 relative z-10">
            <h3 className="text-4xl font-bold mb-8">Web Development</h3>
            <p className="text-gray-300 text-xl leading-relaxed max-w-3xl">
              We build beautiful, responsive, and high-performance websites and web applications using the latest technologies. From simple landing pages to complex web applications, we deliver solutions that drive results.
            </p>
          </div>
        </div>
        
        {/* AI & Machine Learning */}
        <div className="border-t border-b border-gray-800 bg-black hover:border-cyan-500 transition-colors relative overflow-hidden h-[300px] w-full flex items-center justify-end">
          {/* Background Image positioned on the left */}
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.3) 60%, transparent 100%), 
                url('/servicesDivZap.png')
              `,
              backgroundSize: 'cover, 120%',
              backgroundPosition: 'center, 200px',
              backgroundRepeat: 'no-repeat, no-repeat'
            }}
          ></div>
          
          <div className="pr-12 relative z-10">
            <h3 className="text-4xl font-bold mb-8 text-right">AI & Machine Learning</h3>
            <p className="text-gray-300 text-xl leading-relaxed max-w-3xl text-right">
              We help you leverage the power of AI and machine learning to build intelligent applications that solve real-world problems and drive innovation.
            </p>
          </div>
        </div>
        
        {/* UI/UX Design */}
        <div className="border-t border-b border-gray-800 bg-black hover:border-indigo-500 transition-colors relative overflow-hidden h-[300px] w-full flex items-center">
          <div className="pl-12">
            <h3 className="text-4xl font-bold mb-8">UI/UX Design</h3>
            <p className="text-gray-300 text-xl leading-relaxed max-w-3xl">
              We create intuitive and engaging user interfaces that provide seamless user experiences across all devices and platforms.
            </p>
          </div>
          {/* Visual Icon */}
          <div className="absolute bottom-6 right-6 opacity-20">
            <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>
        
        {/* Brand Identity and Strategy */}
        <div className="border-t border-b border-gray-800 bg-black hover:border-blue-800 transition-colors relative overflow-hidden h-[300px] w-full flex items-center justify-end">
          <div className="pr-12">
            <h3 className="text-4xl font-bold mb-8 text-right">Brand Identity & Strategy</h3>
            <p className="text-gray-300 text-xl leading-relaxed max-w-3xl text-right">
              We develop compelling brand identities and strategic frameworks that resonate with your audience and drive business growth.
            </p>
          </div>
          {/* Visual Icon */}
          <div className="absolute bottom-6 left-6 opacity-20">
            <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
