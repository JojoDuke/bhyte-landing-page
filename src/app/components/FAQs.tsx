"use client";
import { useEffect, useState, useRef } from "react";

const faqData = [
  {
    question: "How long does it take to build a website?",
    answer: "Project timelines vary based on complexity and scope. A standard web application typically takes 3 to 4 weeks, while advanced AI-powered platforms can take 4 to 8 weeks. We provide detailed project timelines during our initial consultation."
  },
  {
    question: "What's included in the $1,995/month plan?",
    answer: "Our monthly plan includes 40+ hours of development time, custom web applications, AI/ML integration(Including LLMs, RAG, and AI workflows/automations), API development, SEO implementation, and priority support with monthly strategy sessions."
  },
  {
    question: "Do you offer support and maintenance?",
    answer: "Yes, all our plans include comprehensive support."
  },
  {
    question: "Can you integrate AI into existing systems?",
    answer: "Absolutely. We specialize in integrating AI and machine learning capabilities into existing platforms, from chatbots and recommendation engines to predictive analytics and automated workflows."
  },
  {
    question: "What technologies do you work with?",
    answer: "We work with modern tech stacks including React, Node.js, Bun, Hono, Python, Various AI and LLM Frameworks, cloud platforms (AWS, Azure, GCP), blockchain technologies, and mobile development frameworks like React Native."
  },
  {
    question: "How do you handle project communication?",
    answer: "The most efficient and fastest way for us to communicate with clients is by various instant messaging platforms; mostly WhatsApp, Telegram, Discord or Slack, its all up to the client. We also do review/strategycalls on a regular basis"
  }
];

export default function FAQs() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0); // First one open by default
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

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faqs" ref={sectionRef} className="bg-black text-white relative overflow-hidden">
      
      {/* Subtle Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 50%, rgba(0,0,0,1) 100%),
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(168, 85, 247, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 20% 80%, rgba(99, 102, 241, 0.04) 0%, transparent 50%)
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
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Have questions about our services? Find answers to the most common inquiries about our development process and offerings.
            </p>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openFAQ === index;
              
              return (
                <div
                  key={index}
                  className={`group transition-all duration-700 ease-out ${
                    isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`
                    border border-gray-800 rounded-2xl overflow-hidden transition-all duration-500
                    backdrop-blur-sm bg-gray-900/30
                    ${isOpen ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10' : 'hover:border-gray-700'}
                  `}>
                    {/* Question Header */}
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full p-6 text-left flex items-center justify-between group/button hover:bg-gray-800/20 transition-colors duration-300"
                    >
                      <h3 className="text-xl font-bold text-white pr-4 group-hover/button:text-indigo-400 transition-colors">
                        {faq.question}
                      </h3>
                      
                      {/* Toggle Icon */}
                      <div className={`
                        flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-600 
                        flex items-center justify-center transition-all duration-300
                        ${isOpen ? 'border-indigo-500 bg-indigo-500/20 rotate-180' : 'group-hover/button:border-indigo-400'}
                      `}>
                        <svg 
                          className={`w-4 h-4 transition-colors duration-300 ${
                            isOpen ? 'text-indigo-400' : 'text-gray-400 group-hover/button:text-indigo-400'
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {/* Answer Content */}
                    <div className={`
                      overflow-hidden transition-all duration-500 ease-out
                      ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                    `}>
                      <div className="px-6 pb-6">
                        <div className="pt-2 border-t border-gray-800/50">
                          <p className="text-gray-300 leading-relaxed text-lg pt-4">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact CTA */}
        <div className={`container mx-auto px-4 mt-16 text-center transition-all duration-1000 ease-out ${
          isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '800ms' }}>
          <p className="text-gray-400 text-lg mb-6">
            Still have questions? We&apos;re here to help.
          </p>
          <button 
            onClick={() => window.open('https://cal.com/bhyte-lwy0r0/30min?overlayCalendar=true', '_blank')}
            className="px-10 py-5 rounded-full font-semibold text-black bg-gradient-to-r from-white to-gray-100 hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
