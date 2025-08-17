"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Testimonials() {
  const [isAnimated, setIsAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            setTimeout(() => setIsAnimated(true), 300); // Delay for better effect
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
    <section 
      id="testimonials"
      ref={sectionRef}
      className="bg-black text-white py-20 border-t border-b border-gray-900 relative"
    >
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-900 transform -translate-x-1/2"></div>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div className={`md:pr-8 transition-all duration-1000 ease-out ${
            isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <p className="text-gray-400 mb-6">
              &quot;Bhyte delivered solid work with impressive responsiveness. Their technical capabilities and quick communication made them feel like a true development partner who understood our vision.&quot;
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                <Image
                  src="/tstmnImages/chrisO.png"
                  alt="Chris Ogbuehi"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="font-bold text-white">Chris Ogbuehi</p>
                <p className="text-sm text-gray-400">CEO, GenY Solutions</p>
              </div>
            </div>
          </div>
          
          <div className={`md:pl-8 transition-all duration-1000 ease-out delay-300 ${
            isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <p className="text-gray-400 mb-6">
              &quot;Working with Bhyte Software was a fantastic experience. They are a team of young professionals who are passionate about what they do. I highly recommend them to anyone looking for a top-tier software development partner.&quot;
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                <Image
                  src="/tstmnImages/pRsj.png"
                  alt="Prasanth Raj"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="font-bold text-white">Prasanth Raj</p>
                <p className="text-sm text-gray-400">Founder and CEO, FetchTalent AI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}