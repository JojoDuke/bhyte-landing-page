"use client";
import { useEffect, useState, useRef } from "react";

const pricingPlans = [
  {
    category: "Unlimited Premium Product Development and Design",
    title: "$1995",
    subtitle: "/mo",
    originalPrice: "$1995",
    discountPrice: "$1397",
    discount: "30% discount on the first month",
    features: [
      "World class design in Figma",
      "Flawless web, mobile and AI development done in record time",
      "AI workflows/automations with n8n, Gumloop, Make, etc...",
      "Unlimited Revisions",
      "Up to 40 hours of dev and design work per month",
      "Updates every 24-48 hours",
      "Pause or cancel anytime"
    ],
    buttonText: "Subscribe",
    buttonUrl: "https://buy.stripe.com/aFaaEWgXscBm1VF2HI1ZS0t"
  },
  {
    category: "Website/Branding",
    subtitle: "if you're looking for something a little more or a little less than the standard",
    title: "Custom Quote",
    features: [
      "Brand Identity Design",
      "Branding/Website Design",
      "Website Development",
      "Simple App Development",
      "Custom Graphics",
      "Logos, Icons, etc...",
      "Updates every 24-48 hours"
    ],
    buttonText: "Book an Intro Call",
    buttonUrl: "https://cal.com/bhyte-lwy0r0/30min"
  }
];

export default function Pricing() {
  const [isAnimated, setIsAnimated] = useState(false);
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

  return (
    <section id="pricing" ref={sectionRef} className="bg-black text-white relative overflow-hidden">
      {/* Separator Line */}
      <div className="border-t border-gray-800"></div>
      
      <div className="pt-32 pb-32 relative z-10">
        {/* Section Heading */}
        <div className={`container mx-auto px-4 mb-20 transition-all duration-1000 ease-out ${
          isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl md:text-7xl font-bold leading-tight mb-4 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Professional development and design services that scale with your business.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-0 max-w-4xl mx-auto rounded-3xl overflow-hidden border border-gray-700 bg-gradient-to-b from-gray-900/50 to-black backdrop-blur-sm">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 ease-out ${
                  isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                } ${index === 0 ? 'md:border-r border-gray-700' : ''} group hover:bg-gray-900/30 transition-colors duration-500`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Main Card */}
                <div className="relative z-10 p-6 md:p-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold text-gray-300 mb-6 tracking-wide leading-relaxed">
                      {plan.category}
                    </h3>
                    {plan.subtitle && !plan.originalPrice && (
                      <p className="text-sm text-gray-500 mb-6 italic leading-relaxed">
                        {plan.subtitle}
                      </p>
                    )}
                    <div className="mb-6">
                      {plan.originalPrice && plan.discountPrice ? (
                        <div className="space-y-3">
                          <div className="flex items-baseline">
                            <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                              {plan.title}
                            </span>
                            <span className="text-xl text-gray-400 ml-2 font-medium">
                              /mo
                            </span>
                          </div>
                          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                            <span className="text-green-400 text-sm font-medium">
                              {plan.discount}
                            </span>
                          </div>
                          <div className="flex items-baseline space-x-2">
                            <span className="text-3xl font-bold text-green-400">
                              {plan.discountPrice}
                            </span>
                            <span className="text-sm text-gray-400 bg-green-500/5 px-2 py-1 rounded">
                              first month
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-baseline">
                            <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                              {plan.title}
                            </span>
                          </div>
                          {plan.subtitle && plan.originalPrice && (
                            <span className="text-lg text-gray-400 font-medium">
                              {plan.subtitle}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-5 mb-12 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start group">
                        <div className="w-6 h-6 mr-4 flex-shrink-0 mt-0.5">
                          <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center group-hover:bg-green-500/30 transition-all duration-200">
                            <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <span className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-200">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <button 
                      onClick={() => window.open(plan.buttonUrl, '_blank')}
                      className="w-full py-5 px-8 rounded-full font-semibold text-black bg-gradient-to-r from-white to-gray-100 hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                    >
                      {plan.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}