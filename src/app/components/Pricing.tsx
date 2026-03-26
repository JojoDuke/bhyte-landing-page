"use client";
import { useEffect, useState, useRef } from "react";
import posthog from "posthog-js";

type PricingPlan = {
  id: 'landing' | 'webmobile' | 'aiagent' | 'workflow';
  category: string;
  subtitle?: string;
  title: string;
  duration?: string;
  extraDetails?: string;
  features: readonly string[];
};

const pricingPlans: readonly PricingPlan[] = [
  {
    id: 'landing',
    category: 'Landing Page',
    subtitle: 'A high-converting single-page experience for your product or brand',
    title: '$799 one-time',
    duration: '15-20 Days',
    extraDetails: 'Extra Pages: +$100/page',
    features: [
      'Custom page design in Figma',
      'Responsive desktop/mobile layout',
      'SEO-friendly content structure',
      'Analytics and lead tracking setup',
      'Lightweight performance-first implementation',
      '1 revision round'
    ]
  },
  {
    id: 'webmobile',
    category: 'Web & Mobile App',
    subtitle: 'Full app development with responsive UX and maintainable architecture',
    title: '$3,499 project',
    duration: '20+ Days',
    features: [
      'Desktop, Tablet, Mobile Responsive',
      'Figma File and Codebase',
      'No Limit to revisions',
      'Updates every 48 hours'
    ]
  },
  {
    id: 'aiagent',
    category: 'AI Agent',
    subtitle: 'Smart automation agent with custom NLP workflows',
    title: '$2,199 project',
    duration: '15-20 Days',
    features: [
      'Custom agent prompts + memory',
      'AI assist flows using GPT-4.1/4o',
      'Intent detection and fallback handling',
      'Data connectors (CRM, Docs, API)',
      'Real-time analytics dashboard',
      'Security audit and privacy controls'
    ]
  },
  {
    id: 'workflow',
    category: 'Workflow & Automations',
    subtitle: 'End-to-end workflow automation for growth and efficiency',
    title: '$1,299 setup',
    duration: '15-20 Days',
    features: [
      'n8n/Make/Gumloop workflow designs',
      'Triggers, conditionals, retries, alerts',
      'SaaS & internal system integrations',
      'Version control and rollback support',
      'Error handling and observability',
      'Ongoing operations handoff'
    ]
  }
];

const ctaButtons = [
  {
    text: "Send a Message",
    url: "https://t.me/itsjojoduke",
    variant: "primary"
  },
  {
    text: "Book a Call",
    url: "https://cal.com/bhyte-lwy0r0/30min?overlayCalendar=true",
    variant: "secondary"
  }
] as const;

export default function Pricing() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [activePlan, setActivePlan] = useState<PricingPlan['id']>('landing');
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
          isAnimated ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
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

        {/* Pricing Module Selector */}
        <div className="container mx-auto px-4 mb-8 max-w-4xl">
          <div className="grid grid-cols-4 gap-2 rounded-xl border border-gray-700 bg-gray-900/60 p-1">
            {pricingPlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setActivePlan(plan.id)}
                className={`cursor-pointer text-xs font-semibold py-2 rounded-lg transition-colors duration-300 ${
                  activePlan === plan.id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/40'
                    : 'bg-gray-800 text-gray-300 hover:bg-blue-500/20 hover:text-white'
                }`}
              >
                {plan.category}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Card */}
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-gray-700 bg-gradient-to-b from-gray-900/50 to-black backdrop-blur-sm">
            {pricingPlans
              .filter((plan) => plan.id === activePlan)
              .map((plan, index) => (
                <div
                  key={plan.id}
                  className={`relative transition-all duration-700 ease-out ${
                    isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  } group hover:bg-gray-900/30 transition-colors duration-500`}
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
                    {plan.subtitle && (
                      <p className="text-sm text-gray-500 mb-6 italic leading-relaxed">
                        {plan.subtitle}
                      </p>
                    )}
                    <div className="mb-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-4 flex-wrap">
                          <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-relaxed pb-2">
                            {plan.title}
                          </span>
                          {plan.duration && (
                            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-400 text-sm font-medium backdrop-blur-md shadow-2xl ring-1 ring-white/5 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white transition-all duration-500">
                              <svg className="w-4 h-4 text-blue-400/80 group-hover:text-blue-400 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="tracking-tight">{plan.duration}</span>
                            </div>
                          )}
                        </div>
                        {plan.extraDetails && (
                          <div className="mt-4 flex items-center gap-2 text-gray-400 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                            <svg className="w-4 h-4 text-blue-400/80" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium tracking-wide">{plan.extraDetails}</span>
                          </div>
                        )}
                      </div>
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
                  <div className="mt-auto space-y-4">
                    {ctaButtons.map((button) => (
                      <button
                        key={button.text}
                        onClick={() => {
                          posthog.capture('pricing_cta_clicked', { 
                            button_text: button.text,
                            plan_id: plan.id,
                            plan_name: plan.category 
                          });
                          window.open(button.url, "_blank");
                        }}
                        className={`w-full py-4 px-8 rounded-full font-semibold tracking-wide transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl flex items-center justify-center ${
                          button.variant === "primary"
                            ? "text-white bg-gradient-to-r from-blue-600 to-blue-500 border border-blue-400/30 hover:from-blue-500 hover:to-cyan-500"
                            : "text-gray-100 bg-transparent border border-gray-500/70 hover:border-blue-400/60 hover:bg-blue-500/10"
                        }`}
                      >
                        {button.text}
                      </button>
                    ))}
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
