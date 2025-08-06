"use client";
import { useEffect, useState, useRef } from "react";

const pricingPlans = [
  {
    name: "Standard",
    price: "$1,500",
    originalPrice: "$1,500",
    discountPrice: "$1,050",
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
            linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 50%, rgba(0,0,0,1) 100%),
            radial-gradient(ellipse 80% 60% at 20% 30%, rgba(147, 51, 234, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 70% 50% at 80% 70%, rgba(79, 70, 229, 0.04) 0%, transparent 50%)
          `
        }}
      ></div>
      
      <div className="pt-32 pb-32 relative z-10">
        {/* Section Heading */}
        <div className={`container mx-auto px-4 mb-20 transition-all duration-1000 ease-out ${
          isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Pricing
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Transparent, value-driven pricing for projects that transform your business. No hidden fees, no surprises.
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
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  {/* Discount Badge */}
                  {plan.discount && (
                    <div className="absolute -top-2 -right-2 z-20">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg transform rotate-12">
                        {plan.discount}
                      </div>
                    </div>
                  )}
                  
                  {/* Main Card */}
                  <div className={`
                    relative border-2 rounded-3xl p-8 transition-all duration-500 cursor-pointer h-full
                    backdrop-blur-sm
                    ${colorClasses.border} ${colorClasses.bg}
                    ${isHovered || plan.popular ? `shadow-2xl ${colorClasses.glow}` : 'shadow-lg shadow-black/20'}
                    transform ${isHovered ? 'scale-105 -translate-y-2' : plan.popular ? 'scale-100' : 'scale-100'}
                  `}>
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2 text-white">
                        {plan.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-6 min-h-[3rem] flex items-center justify-center">
                        {plan.description}
                      </p>
                      
                      {/* Price */}
                      <div className="mb-6">
                        {plan.discountPrice ? (
                          <div>
                            {/* Original Price - Crossed Out */}
                            <div className="text-2xl text-gray-500 line-through mb-1">
                              {plan.originalPrice}
                            </div>
                            {/* Discounted Price - Prominent */}
                            <div className={`text-5xl font-bold mb-2 ${colorClasses.accent}`}>
                              {plan.discountPrice}
                            </div>
                            <div className="text-gray-400">
                              per {plan.period} <span className="text-green-400 font-medium">(first month)</span>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              Then {plan.originalPrice}/{plan.period}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className={`text-5xl font-bold mb-2 ${colorClasses.accent}`}>
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
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <div className={`w-5 h-5 rounded-full ${colorClasses.accent} bg-current p-1 mr-3 flex-shrink-0`}>
                            <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <button className={`
                        w-full py-4 px-6 rounded-xl font-bold text-white
                        transition-all duration-300 transform
                        ${colorClasses.button}
                        ${isHovered ? 'scale-105 shadow-lg' : 'scale-100'}
                      `}>
                        {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
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
        <div className={`container mx-auto px-4 mt-16 text-center transition-all duration-1000 ease-out ${
          isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '600ms' }}>
          <p className="text-gray-400 text-lg">
            All plans include free consultations and project planning. 
            <span className="text-indigo-400 font-medium"> Contact us</span> for custom requirements.
          </p>
        </div>
      </div>
    </section>
  );
}
