"use client";
import { useEffect, useState, useRef } from "react";

const pricingPlans = [
  {
    name: "Standard",
    price: "$2,000",
    originalPrice: "$2,000",
    discountPrice: "$1,400",
    period: "month",
    description: "Comprehensive monthly development services for growing businesses",
    features: [
      "40+ Hours Development Time",
      "Web & Mobile Applications",
      "AI/ML Integration",
      "Custom API Development",
      "Responsive Design",
      "Performance Optimization",
      "SEO Implementation",
      "Third-party Integrations",
      "Monthly Strategy Sessions",
      "Priority Support"
    ],
    color: "purple",
    popular: true,
    discount: "30% off first month"
  },
  {
    name: "Enterprise",
    price: "Custom",
    originalPrice: null,
    discountPrice: null,
    period: "quote",
    description: "Tailored solutions for large organizations with specific requirements",
    features: [
      "Dedicated Development Team",
      "Custom Project Scope",
      "Enterprise Architecture",
      "Advanced AI/ML Systems",
      "Microservices & APIs",
      "24/7 Support & Monitoring",
      "Compliance & Security",
      "Training & Documentation",
      "Dedicated Project Manager",
      "SLA Guarantees"
    ],
    color: "cyan",
    popular: false,
    discount: null
  }
];

export default function Pricing() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isAnimated]);

  const getColorClasses = (color: string, isHovered: boolean, isPopular: boolean) => {
    const colors = {
      indigo: {
        border: isHovered || isPopular ? 'border-indigo-500' : 'border-gray-800',
        bg: isHovered ? 'bg-indigo-500/10' : isPopular ? 'bg-indigo-500/5' : 'bg-gray-900/50',
        accent: 'text-indigo-400',
        button: 'bg-indigo-600 hover:bg-indigo-700',
        glow: 'shadow-indigo-500/20'
      },
      purple: {
        border: isHovered || isPopular ? 'border-purple-500' : 'border-gray-800',
        bg: isHovered ? 'bg-purple-500/10' : isPopular ? 'bg-purple-500/5' : 'bg-gray-900/50',
        accent: 'text-purple-400',
        button: 'bg-purple-600 hover:bg-purple-700',
        glow: 'shadow-purple-500/20'
      },
      cyan: {
        border: isHovered || isPopular ? 'border-cyan-500' : 'border-gray-800',
        bg: isHovered ? 'bg-cyan-500/10' : isPopular ? 'bg-cyan-500/5' : 'bg-gray-900/50',
        accent: 'text-cyan-400',
        button: 'bg-cyan-600 hover:bg-cyan-700',
        glow: 'shadow-cyan-500/20'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section ref={sectionRef} className="bg-black text-white relative overflow-hidden">
      {/* Separator Line */}
      <div className="border-t border-gray-800"></div>
      
      {/* Elegant Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,1) 100%),
            radial-gradient(ellipse 90% 70% at 20% 30%, rgba(147, 51, 234, 0.08) 0%, transparent 70%),
            radial-gradient(ellipse 80% 60% at 80% 70%, rgba(79, 70, 229, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 50% 50%, rgba(6, 182, 212, 0.03) 0%, transparent 50%)
          `
        }}
      ></div>
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="pt-32 pb-32 relative z-10">
        {/* Section Heading */}
        <div className={`container mx-auto px-4 mb-24 transition-all duration-1000 ease-out ${
          isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 mb-8">
              <span className="text-purple-400 text-sm font-medium">Flexible & Transparent</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-8 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
              Simple Pricing
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Transparent, value-driven pricing for projects that transform your business. No hidden fees, no surprises.
              <span className="block mt-2 text-purple-400 font-medium">Start with 30% off your first month</span>
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => {
              const isHovered = hoveredCard === index;
              const colorClasses = getColorClasses(plan.color, isHovered, plan.popular);
              
              return (
                <div
                  key={index}
                  className={`relative group transition-all duration-700 ease-out ${
                    isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  } ${plan.popular ? 'scale-105' : 'scale-100'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 text-white px-8 py-3 rounded-full text-sm font-bold shadow-xl border border-purple-400/30">
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2L3 8l7 6 7-6-7-6z" clipRule="evenodd" />
                          </svg>
                          Most Popular
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Discount Badge */}
                  {plan.discount && (
                    <div className="absolute -top-3 -right-3 z-20">
                      <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white px-5 py-3 rounded-full text-sm font-bold shadow-xl transform rotate-12 border border-emerald-400/30">
                        <span className="flex items-center gap-1">
                          🎉 {plan.discount}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Main Card */}
                  <div className={`
                    relative border-2 rounded-3xl p-10 transition-all duration-500 cursor-pointer h-full
                    backdrop-blur-sm overflow-hidden
                    ${colorClasses.border} ${colorClasses.bg}
                    ${isHovered || plan.popular ? `shadow-2xl ${colorClasses.glow}` : 'shadow-xl shadow-black/30'}
                    transform ${isHovered ? 'scale-105 -translate-y-3' : plan.popular ? 'scale-100' : 'scale-100'}
                  `}>
                    {/* Card Inner Glow */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none"
                         style={{
                           background: `radial-gradient(circle at 50% 0%, ${
                             plan.color === 'purple' ? 'rgba(147, 51, 234, 0.1)' : 'rgba(6, 182, 212, 0.1)'
                           } 0%, transparent 50%)`,
                           opacity: isHovered || plan.popular ? 1 : 0
                         }}>
                    </div>
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2 text-white">
                        {plan.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-6 min-h-[3rem] flex items-center justify-center">
                        {plan.description}
                      </p>
                      
                      {/* Price */}
                      <div className="mb-8">
                        {plan.discountPrice ? (
                          <div className="relative">
                            {/* Original Price - Crossed Out */}
                            <div className="text-2xl text-gray-500 line-through mb-2 relative">
                              {plan.originalPrice}
                              <span className="absolute -top-1 -right-8 text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">
                                reg
                              </span>
                            </div>
                            {/* Discounted Price - Prominent */}
                            <div className={`text-6xl font-bold mb-3 ${colorClasses.accent} bg-gradient-to-r from-current to-purple-300 bg-clip-text text-transparent`}>
                              {plan.discountPrice}
                            </div>
                            <div className="text-gray-300 mb-2">
                              per {plan.period} <span className="inline-flex items-center px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium ml-2">first month</span>
                            </div>
                            <div className="text-sm text-gray-400 bg-gray-800/30 rounded-lg px-3 py-2">
                              Then {plan.originalPrice}/{plan.period} (save $600 first month)
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className={`text-6xl font-bold mb-3 ${colorClasses.accent} bg-gradient-to-r from-current to-cyan-300 bg-clip-text text-transparent`}>
                              {plan.price}
                            </div>
                            <div className="text-gray-400">
                              per {plan.period}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-5 mb-10">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center group">
                          <div className={`w-6 h-6 rounded-full ${colorClasses.accent} bg-current p-1.5 mr-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}>
                            <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-200 text-sm font-medium group-hover:text-white transition-colors duration-200">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto relative z-10">
                      <button className={`
                        w-full py-5 px-8 rounded-2xl font-bold text-white relative overflow-hidden
                        transition-all duration-300 transform group
                        ${colorClasses.button}
                        ${isHovered ? 'scale-105 shadow-2xl' : 'scale-100'}
                        hover:shadow-2xl
                      `}>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                          <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      </button>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className={`
                      absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none
                      ${isHovered || plan.popular ? 'opacity-100' : 'opacity-0'}
                    `} style={{
                      background: `radial-gradient(circle at 50% 50%, ${
                        plan.color === 'indigo' ? 'rgba(99, 102, 241, 0.05)' : 
                        plan.color === 'purple' ? 'rgba(147, 51, 234, 0.05)' : 'rgba(6, 182, 212, 0.05)'
                      } 0%, transparent 70%)`
                    }}></div>
          </div>
          </div>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className={`container mx-auto px-4 mt-20 text-center transition-all duration-1000 ease-out ${
          isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '600ms' }}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-gray-900/50 via-gray-800/30 to-gray-900/50 rounded-2xl border border-gray-800/50 p-8">
              <p className="text-gray-300 text-lg mb-4">
                All plans include free consultations and project planning.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No setup fees
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Cancel anytime
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Money-back guarantee
                </span>
              </div>
              <p className="text-gray-400 text-base mt-4">
                <span className="text-purple-400 font-medium hover:text-purple-300 transition-colors cursor-pointer">Contact us</span> for custom requirements or enterprise solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
