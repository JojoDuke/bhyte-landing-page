"use client";

import Image from 'next/image';
import Footer from '../components/Footer';
import React, { useRef, useEffect } from 'react';

// Easy to edit: Add/remove images here
const portfolioImages: { src: string; name: string; link?: string }[] = [
  { src: '/bluespace.png', name: 'MeetingIQ', link: 'https://example.com/blue-space' },
  { src: '/bluespace.png', name: 'Midas', link: 'https://usemidas.app' },
  { src: '/bluespace.png', name: 'Papermind' },
  { src: '/bluespace.png', name: 'Papermind' },
  { src: '/bluespace.png', name: 'Papermind' },
  { src: '/bluespace.png', name: 'Papermind' },
  { src: '/bluespace.png', name: 'Papermind' },
  { src: '/bluespace.png', name: 'Papermind' },
  { src: '/bluespace.png', name: 'Papermind' },
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

    let totalWidthOfOneSet = calculateWidth();
    let currentTranslate = 0;
    // You can change the speed here (pixels per second)
    const speed = 150;

    let lastTimestamp: number | null = null;

    const animateScroll = (timestamp: number) => {
      if (!isMounted) return;
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
      totalWidthOfOneSet = calculateWidth();
    };

    window.addEventListener('resize', handleResize);
    carousel.addEventListener('mouseenter', stopAnimation);
    carousel.addEventListener('mouseleave', startAnimation);

    startAnimation();

    return () => {
      isMounted = false;
      stopAnimation();
      window.removeEventListener('resize', handleResize);
      carousel.removeEventListener('mouseenter', stopAnimation);
      carousel.removeEventListener('mouseleave', startAnimation);
    };
  }, [portfolioImages.length]);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen text-white relative overflow-hidden">
        {/* Background Image */}
        <Image
          src="/bluespace.png"
          alt="Blue space background"
          fill
          className="object-cover -z-10"
          priority
        />
        
        {/* Floating Blue Lights */}
        <div className="absolute inset-0 -z-5 pointer-events-none">
          <div className="floating-light floating-light-1"></div>
          <div className="floating-light floating-light-2"></div>
          <div className="floating-light floating-light-3"></div>
          <div className="floating-light floating-light-4"></div>
          <div className="floating-light floating-light-5"></div>
        </div>
        
        <div className="relative z-10 pt-24 text-center animate-fadeInUp">
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
            <button className="px-6 py-3 bg-transparent text-white font-medium rounded-full border border-gray-600 hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer">
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
                  className="flex-shrink-0 w-[600px] h-96 relative rounded-lg overflow-hidden group cursor-pointer"
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
                  className="flex-shrink-0 w-[600px] h-96 relative rounded-lg overflow-hidden group cursor-pointer"
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

      {/* Footer Component */}
      <Footer />
    </>
  );
} 