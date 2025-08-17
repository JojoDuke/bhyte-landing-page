"use client";

export default function About() {
  return (
    <section id="about" className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-fadeInUp">
            Obsessed with building <br />
            great products
          </h1>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Video */}
          <div className="relative">
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg">
              <video
                src="https://cdn.midjourney.com/video/cfefb8b2-bd91-46c2-b48f-a59dcc4f5ef6/0.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
            In 2023, we started Bhyte with the simple goal of helping small businesses and startups to build the ideal product and harness the powers of the web for development, marketing and sales.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
            As time went on and we worked on project after project, we started to recognize the transformative potential of AI and how its potentially going to shape the world and software products completely.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
            We wanted to play on top of that and today, Bhyte stands as one of the leading agencies in the AI, SaaS and web space delivering world class products to our clients on a regular basis, without the fluff of other traditional studios.
            </p>

            {/* Call to Action */}
            <div className="pt-6">
              <button className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
                <span>Scroll to learn more about us</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
