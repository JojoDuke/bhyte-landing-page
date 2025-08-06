"use client";

import Image from 'next/image';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import About from '../components/About';
import OurServices from '../components/OurServices';
import OurProcess from '../components/OurProcess';
import OurWork from '../components/OurWork';
import Pricing from '../components/Pricing';
import FAQs from '../components/FAQs';
import CallToAction from '../components/CallToAction';
import React, { useRef, useEffect } from 'react';

// Easy to edit: Add/remove images here
const portfolioImages: { src: string; name: string; link?: string; width: string }[] = [
  { src: '/portfolioImages/miq.png', name: 'MeetingIQ', link: 'https://www.builtwithatlas.com/meeting-iq', width: 'w-[700px]' },
  { src: '/portfolioImages/midas.png', name: 'Midas', link: 'https://usemidas.app', width: 'w-[650px]' },
  { src: '/portfolioImages/papermind.png', name: 'Papermind', link: 'https://usepapermind.com/', width: 'w-[750px]' },
  { src: '/portfolioImages/astrae.png', name: 'Astrae', link: 'https://astrae.design', width: 'w-[680px]' },
  { src: '/portfolioImages/stakenet.png', name: 'Stakenet', link: 'https://stakenetapp.vercel.app/', width: 'w-[720px]' },
  { src: '/portfolioImages/voiceafrica.png', name: 'VoiceAfrica AI', link: 'https://www.voiceafrica.ai/', width: 'w-[690px]' },
  { src: '/portfolioImages/genysolutions.png', name: 'GenY Solutions', link: 'https://genysolutions.tech/', width: 'w-[710px]' },
  { src: '/portfolioImages/hire1.png', name: 'Hire1 AI', link: 'https://hire1-ai-roan.vercel.app/', width: 'w-[660px]' },
  { src: '/portfolioImages/atlas.png', name: 'Atlas Labs', link: 'https://builtwithatlas.com/', width: 'w-[740px]' },
  { src: '/portfolioImages/intero.png', name: 'Intero', link: 'https://www.nickwemyssrealestate.com/', width: 'w-[730px]' },
  { src: '/portfolioImages/philippine.png', name: 'Philippine Careers', link: 'https://www.philippine.careers/', width: 'w-[760px]' },
];

export default function Studio() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationFrameId: number;
    let isMounted = true;

    const calculateWidth = () => {
      const imageElements = Array.from(carousel.children) as HTMLElement[];
      const gap = parseFloat(window.getComputedStyle(carousel).columnGap || '0');
      let totalWidth = 0;
      // Calculate the width of the first set of images
      for (let i = 0; i < portfolioImages.length; i++) {
        if (imageElements[i]) {
          totalWidth += imageElements[i].offsetWidth + gap;
        }
      }
      return totalWidth;
    };

    // Wait a moment for images to load and render before calculating width
    const initializeCarousel = () => {
      setTimeout(() => {
        totalWidthOfOneSet = calculateWidth();
        if (totalWidthOfOneSet > 0) {
          startAnimation();
        }
      }, 100);
    };

    let totalWidthOfOneSet = 0;
    let currentTranslate = 0;
    // You can change the speed here (pixels per second)
    const speed = 150;

    let lastTimestamp: number | null = null;

    const animateScroll = (timestamp: number) => {
      if (!isMounted || totalWidthOfOneSet <= 0) return;
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }

      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      currentTranslate -= (speed * deltaTime) / 1000;

      // Seamless loop logic
      if (currentTranslate <= -totalWidthOfOneSet) {
        currentTranslate += totalWidthOfOneSet;
      }

      carousel.style.transform = `translateX(${currentTranslate}px)`;
      animationFrameId = requestAnimationFrame(animateScroll);
    };

    const startAnimation = () => {
      if (!isMounted) return;
      lastTimestamp = null; // Reset timestamp
      animationFrameId = requestAnimationFrame(animateScroll);
    };

    const stopAnimation = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleResize = () => {
      setTimeout(() => {
        totalWidthOfOneSet = calculateWidth();
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    carousel.addEventListener('mouseenter', stopAnimation);
    carousel.addEventListener('mouseleave', startAnimation);

    initializeCarousel();

    return () => {
      isMounted = false;
      stopAnimation();
      window.removeEventListener('resize', handleResize);
      carousel.removeEventListener('mouseenter', stopAnimation);
      carousel.removeEventListener('mouseleave', startAnimation);
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen text-white relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover">
            <source 
              src="https://res.cloudinary.com/dtolochpp/video/upload/v1754060879/u9364766947_Make_it_like_this_the_shooting_stars_that_come_to_7c375435-75bd-43d0-baca-56ce40f53e8b_3undefined_wjpzzn.mp4" 
              type="video/mp4" />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center animate-fadeInUp">
          <h1 className="text-6xl font-bold max-w-4xl mx-auto px-4 text-transparent bg-clip-text leading-tight metallic-shimmer">
            Visually stunning AI and SaaS products built from the ground up
          </h1>
          <p className="text-xl text-gray-300 mt-6 max-w-4xl mx-auto px-4" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 0, 0, 0.5)' }}>
            Bhyte Studio is an AI-first and design driven product studio and agency shaping the next wave of software.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="px-6 py-3 bg-black text-white font-medium rounded-full border border-gray-700 hover:bg-blue-500 hover:text-black hover:border-blue-500 transition-all duration-300 cursor-pointer">
              Book a Call
            </button>
            <button className="px-6 py-3 bg-white text-black font-medium rounded-full border border-white hover:bg-transparent hover:text-white hover:border-gray-600 transition-all duration-300 cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Portfolio Carousel Section */}
      <section className="bg-black py-20">
        {/* Seamless infinite carousel */}
        <div className="w-full overflow-hidden">
          <div
            className="portfolio-carousel flex gap-8 min-w-max"
            ref={carouselRef}
            style={{ willChange: 'transform' }}
          >
            {portfolioImages.map((item, index) => {
              const content = (
                <div
                  className={`flex-shrink-0 ${item.width} h-[28rem] relative rounded-lg overflow-hidden group cursor-pointer`}
                >
                  <Image
                    src={item.src}
                    alt={`Portfolio work ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {/* Name tag */}
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white text-sm px-3 py-1 rounded-lg shadow-md group-hover:bg-blue-600 transition-colors duration-300">
                    {item.name}
                  </div>
                </div>
              );
              return item.link ? (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {content}
                </a>
              ) : (
                <div key={index}>{content}</div>
              );
            })}
            {/* Clone the images for seamless looping */}
            {portfolioImages.map((item, index) => {
              const content = (
                <div
                  className={`flex-shrink-0 ${item.width} h-[28rem] relative rounded-lg overflow-hidden group cursor-pointer`}
                >
                  <Image
                    src={item.src}
                    alt={`Portfolio work clone ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {/* Name tag */}
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white text-sm px-3 py-1 rounded-lg shadow-md group-hover:bg-blue-600 transition-colors duration-300">
                    {item.name}
                  </div>
                </div>
              );
              return item.link ? (
                <a
                  key={`clone-${index}`}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {content}
                </a>
              ) : (
                <div key={`clone-${index}`}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      <Testimonials />
      <About />
      <OurServices />
      <OurProcess />
      <OurWork />
      <Pricing />
      <FAQs />
      <CallToAction />

      {/* Footer Component */}
      <Footer />
    </>
  );
} 