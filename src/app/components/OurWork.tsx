"use client";

import Image from 'next/image';

const workItems = [
  { src: '/bluespace.png', title: 'Project Alpha', description: 'A cutting-edge AI solution for data analysis.' },
  { src: '/bluespace.png', title: 'Project Beta', description: 'A robust e-commerce platform with seamless user experience.' },
  { src: '/bluespace.png', title: 'Project Gamma', description: 'A mobile application designed for health and fitness tracking.' },
  { src: '/bluespace.png', title: 'Project Delta', description: 'An interactive web application for educational purposes.' },
];

export default function OurWork() {
  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Work</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Explore some of our recent projects and see how we bring ideas to life.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workItems.map((item, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={item.src}
                alt={item.title}
                width={600}
                height={400}
                className="object-cover w-full h-48"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}