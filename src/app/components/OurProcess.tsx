"use client";
import { useEffect, useState, useRef } from "react";

export default function OurProcess() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            setTimeout(() => setIsAnimated(true), 200);
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

  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      description: "We start by understanding your goals, requirements, and target audience through comprehensive research and stakeholder interviews.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      color: "blue"
    },
    {
      number: "02", 
      title: "Design",
      description: "We create beautiful and intuitive designs that align with your brand vision using cutting-edge design principles and user experience research.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      color: "cyan"
    },
    {
      number: "03",
      title: "Development", 
      description: "We build your product using the latest technologies and best practices, ensuring scalability, performance, and maintainability.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      color: "indigo"
    },
    {
      number: "04",
      title: "Launch",
      description: "We deploy your product to production with comprehensive testing, monitoring, and provide ongoing support and maintenance.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      color: "purple"
    }
  ];

  const getColorClasses = (color: string, isHovered: boolean) => {
    const colors = {
      blue: {
        border: isHovered ? 'border-blue-500' : 'border-gray-800',
        bg: isHovered ? 'bg-blue-500/10' : 'bg-black',
        accent: 'text-blue-400',
        glow: 'shadow-blue-500/20'
      },
      cyan: {
        border: isHovered ? 'border-cyan-500' : 'border-gray-800', 
        bg: isHovered ? 'bg-cyan-500/10' : 'bg-black',
        accent: 'text-cyan-400',
        glow: 'shadow-cyan-500/20'
      },
      indigo: {
        border: isHovered ? 'border-indigo-500' : 'border-gray-800',
        bg: isHovered ? 'bg-indigo-500/10' : 'bg-black', 
        accent: 'text-indigo-400',
        glow: 'shadow-indigo-500/20'
      },
      purple: {
        border: isHovered ? 'border-purple-500' : 'border-gray-800',
        bg: isHovered ? 'bg-purple-500/10' : 'bg-black',
        accent: 'text-purple-400', 
        glow: 'shadow-purple-500/20'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section ref={sectionRef} className="bg-black text-white relative overflow-hidden">
      {/* Separator Line */}
      <div className="border-t border-gray-800"></div>
      
      {/* AGGRESSIVE Flowing Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Explosive magenta storm */}
        <div 
          className="absolute -top-40 left-1/4 opacity-90"
          style={{
            width: '700px',
            height: '500px',
            background: 'radial-gradient(ellipse 70% 50%, rgba(236, 72, 153, 1) 0%, rgba(168, 85, 247, 0.8) 20%, rgba(79, 70, 229, 0.6) 45%, rgba(219, 39, 119, 0.4) 70%, transparent 90%)',
            filter: 'blur(80px)',
            transform: 'rotate(-25deg) skew(-15deg, 5deg)'
          }}
        ></div>
        
        {/* Fierce orange inferno */}
        <div 
          className="absolute top-0 right-0 opacity-85"
          style={{
            width: '600px',
            height: '450px',
            background: 'radial-gradient(ellipse 60% 80%, rgba(251, 146, 60, 1) 0%, rgba(249, 115, 22, 0.9) 25%, rgba(239, 68, 68, 0.7) 50%, rgba(234, 88, 12, 0.5) 75%, transparent 100%)',
            filter: 'blur(70px)',
            transform: 'rotate(35deg) skew(10deg, -20deg)'
          }}
        ></div>
        
        {/* Intense emerald eruption */}
        <div 
          className="absolute bottom-10 left-0 opacity-80"
          style={{
            width: '550px',
            height: '400px',
            background: 'radial-gradient(ellipse 80% 60%, rgba(20, 184, 166, 0.9) 0%, rgba(6, 182, 212, 0.7) 30%, rgba(34, 197, 94, 0.6) 60%, rgba(16, 185, 129, 0.4) 85%, transparent 100%)',
            filter: 'blur(60px)',
            transform: 'rotate(-45deg) skew(20deg, -10deg)'
          }}
        ></div>
        
        {/* Violent purple chaos */}
        <div 
          className="absolute bottom-0 right-1/3 opacity-95"
          style={{
            width: '500px',
            height: '380px',
            background: 'radial-gradient(ellipse 90% 70%, rgba(147, 51, 234, 1) 0%, rgba(126, 34, 206, 0.8) 25%, rgba(168, 85, 247, 0.6) 50%, rgba(139, 92, 246, 0.4) 80%, transparent 100%)',
            filter: 'blur(75px)',
            transform: 'rotate(60deg) skew(-25deg, 15deg)'
          }}
        ></div>
        
        {/* Blazing gold explosion */}
        <div 
          className="absolute top-1/3 left-1/2 opacity-75"
          style={{
            width: '350px',
            height: '280px',
            background: 'radial-gradient(ellipse 60% 40%, rgba(245, 158, 11, 1) 0%, rgba(251, 191, 36, 0.8) 40%, rgba(234, 179, 8, 0.6) 70%, transparent 100%)',
            filter: 'blur(50px)',
            transform: 'rotate(-60deg) skew(30deg, -5deg)'
          }}
        ></div>
        
        {/* Electric magenta bolt */}
        <div 
          className="absolute top-2/3 right-10 opacity-70"
          style={{
            width: '400px',
            height: '300px',
            background: 'radial-gradient(ellipse 50% 70%, rgba(219, 39, 119, 1) 0%, rgba(190, 24, 93, 0.8) 35%, rgba(244, 63, 94, 0.5) 70%, transparent 90%)',
            filter: 'blur(55px)',
            transform: 'rotate(120deg) skew(-15deg, 25deg)'
          }}
        ></div>
        
        {/* Molten ember core */}
        <div 
          className="absolute top-1/2 left-10 opacity-65"
          style={{
            width: '300px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(234, 88, 12, 1) 0%, rgba(202, 138, 4, 0.8) 50%, rgba(251, 146, 60, 0.4) 80%, transparent 100%)',
            filter: 'blur(45px)',
            transform: 'rotate(90deg) skew(10deg, -30deg)'
          }}
        ></div>
        
        {/* Raw energy overlay */}
        <div 
          className="absolute top-1/4 right-1/4 opacity-60"
          style={{
            width: '320px',
            height: '220px',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.9) 0%, rgba(236, 72, 153, 0.6) 60%, transparent 100%)',
            filter: 'blur(40px)',
            transform: 'rotate(-90deg) skew(45deg, -15deg)'
          }}
        ></div>
        
        {/* Lighter atmospheric overlay to maintain readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 50% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.7) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)
            `
          }}
        ></div>
        
        {/* Gradient Transition to Next Section */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: `
              linear-gradient(to bottom, 
                rgba(0,0,0,0.1) 0%, 
                rgba(0,0,0,0.4) 30%, 
                rgba(0,0,0,0.7) 60%, 
                rgba(0,0,0,0.9) 80%, 
                rgba(0,0,0,1) 100%
              )
            `
          }}
        ></div>
        </div>
      
      <div className="pt-32 pb-32 relative z-10">
        {/* Section Heading */}
        <div className={`container mx-auto px-4 mb-20 transition-all duration-1000 ease-out ${
          isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Our Process
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              A proven methodology designed to ensure transparent, collaborative, and efficient delivery. From conception to launch, we guide your project through every critical phase.
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const isHovered = hoveredCard === index;
              const colorClasses = getColorClasses(step.color, isHovered);
              
              return (
                <div
                  key={index}
                  className={`relative group transition-all duration-500 ease-out ${
                    isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Connection Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-8 h-px bg-gradient-to-r from-gray-600 to-transparent z-0"></div>
                  )}
                  
                  {/* Card */}
                  <div className={`
                    relative border-2 rounded-2xl p-8 transition-all duration-500 cursor-pointer
                    ${colorClasses.border} ${colorClasses.bg}
                    ${isHovered ? `shadow-2xl ${colorClasses.glow}` : 'shadow-lg shadow-black/20'}
                    transform ${isHovered ? 'scale-105 -translate-y-2' : 'scale-100'}
                  `}>
                    {/* Step Number */}
                    <div className={`
                      inline-flex items-center justify-center w-16 h-16 rounded-full border-2 mb-6
                      ${colorClasses.border} ${colorClasses.bg}
                      transition-all duration-300
                    `}>
                      <span className={`text-2xl font-bold ${colorClasses.accent}`}>
                        {step.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className={`${colorClasses.accent} mb-4 transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                      {step.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-white transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Hover Effect Overlay */}
                    <div className={`
                      absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500
                      ${isHovered ? 'opacity-100' : 'opacity-0'}
                    `} style={{
                      background: `radial-gradient(circle at 50% 50%, ${step.color === 'blue' ? 'rgba(59, 130, 246, 0.05)' : 
                        step.color === 'cyan' ? 'rgba(34, 211, 238, 0.05)' :
                        step.color === 'indigo' ? 'rgba(99, 102, 241, 0.05)' : 'rgba(168, 85, 247, 0.05)'} 0%, transparent 70%)`
                    }}></div>
          </div>
          </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}