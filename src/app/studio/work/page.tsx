"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SelectedWork() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  // Array of all work images
  const workImages = [
    'image.png',
    'image (1).png',
    'image (2).png',
    'image (3).png',
    'image (4).png',
    'scFT.png',
    '{55170F31-A4CE-407F-A28A-019064A8D662}.png',
    '{68508E2A-B28C-4E46-8A49-4091E8ED63FC}.png',
    '{E7695B4F-5F7A-4FC7-BB38-14B94BF2C76F}.png',
    '{DC09DF19-D678-4088-B9DF-BC09008DE20F}.png',
    '{7BC0A6A0-18CA-42E7-92D6-778329CB1131}.png',
    '{C8CFA67F-1138-4A57-9616-98D874178F68}.png',
    'Untitled.png',
    'Untitled (1).png',
    'Untitled (2).png',
    'Untitled (3).png',
    '{06C1E7BF-E46A-41AB-8213-4F8B8C224FCB}.png',
    '{F3069C65-2624-4117-B7A3-4E15294153CD}.png',
    '{D25C3CCD-ECC2-4A9C-88EF-B2E25BF64A97}.png',
    'Untitled (4).png',
    'Untitled (5).png',
    'Untitled (6).png',
    'Untitled (7).png',
    'Untitled (8).png',
    'Untitled (9).png',
    'image (5).png',
    'image (6).png',
    'image (7).png',
    'Untitled (10).png',
    'Untitled (11).png',
    'Untitled (12).png',
    'Untitled (13).png',
    'Untitled (14).png',
    'Untitled (15).png',
    'Untitled (16).png',
    'Untitled (17).png',
    'Artboard – 3.png',
    'Artboard – 5.png',
    'Artboard – 7.png',
    'Artboard – 6.png',
    'Untitled (18).png',
    'Untitled (19).png',
    'Untitled (20).png',
    'image (8).png',
    'Get In Touch.png',
    'Not Found 404.png',
    'Page 1.png',
    'Page 7.png',
    'image (9).png',
    'image (10).png',
    'Login.png',
    'Sign Up With Email.png',
    '{22DA419B-6FC0-4704-9D25-C856959C9997}.png',
    '{5DA6B3CD-94E4-4294-AF68-3FFFFBFB5F04}.png',
    '{3E93654F-2AC5-4F27-8C30-49E89D26064D}.png',
    '{3AAA3CFC-2C3C-4DDC-9342-83919A316C2F}.png',
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={`text-6xl md:text-7xl font-bold leading-tight mb-6 transition-all duration-1000 ease-out ${
              isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`}>
              Selected Work
            </h1>
            <p className={`text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto transition-all duration-1000 ease-out ${
              isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`} style={{ transitionDelay: '200ms' }}>
              A curated collection of our most impactful projects showcasing innovation, creativity, and technical excellence across various industries and technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Work Gallery - Vertical Layout */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {workImages.map((imageName, index) => (
                <div 
                  key={imageName}
                  className={`w-full transition-all duration-1000 ease-out ${
                    isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: `${600 + (index * 100)}ms` 
                  }}
                >
                  <div className="w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
                    <Image
                      src={`/Bhyte Works/${imageName}`}
                      alt={`Bhyte work - ${imageName.replace(/\.(png|jpg|jpeg)$/i, '').replace(/[{}]/g, '')}`}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-cover"
                      priority={index < 3} // Prioritize loading for first 3 images
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
