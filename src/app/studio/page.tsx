import Image from 'next/image';
import Footer from '../components/Footer';

// Easy to edit: Add/remove images here
const portfolioImages = [
  '/bluespace.png', // Replace with your actual work images
  '/bluespace.png', 
  '/bluespace.png',
  '/bluespace.png',
  '/bluespace.png',
  '/bluespace.png',
];

export default function Studio() {
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
        {/* Continuously moving carousel */}
        <div className="w-full overflow-hidden">
          <div className="portfolio-carousel flex gap-8">
            {/* First set of images */}
            {portfolioImages.map((image, index) => (
              <div key={`first-${index}`} className="flex-shrink-0 w-[600px] h-96 relative rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`Portfolio work ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {portfolioImages.map((image, index) => (
              <div key={`second-${index}`} className="flex-shrink-0 w-[600px] h-96 relative rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`Portfolio work ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </>
  );
} 