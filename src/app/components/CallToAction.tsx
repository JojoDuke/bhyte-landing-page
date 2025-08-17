"use client";

export default function CallToAction() {
  // Background is always animated/visible - no scroll trigger needed
  const isAnimated = true;

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Background Video/Visual Container - Ready for future content */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder for future background video/visual */}
        <div className="absolute inset-0 bg-black"></div>
      </div>

      {/* Smooth Top Blend */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 z-15"
        style={{
          background: `
            linear-gradient(to bottom, 
              rgba(0,0,0,1) 0%, 
              rgba(0,0,0,0.8) 25%, 
              rgba(0,0,0,0.4) 60%, 
              rgba(0,0,0,0.1) 85%, 
              transparent 100%
            )
          `
        }}
      ></div>

      {/* Ambient Color Background */}
      <div className="absolute inset-0 z-10">
        {/* Purple ambient burst */}
        <div 
          className={`absolute -top-20 left-1/4 w-96 h-96 transition-all duration-1500 ease-out ${
            isAnimated ? 'opacity-80 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.8) 0%, rgba(147, 51, 234, 0.4) 30%, rgba(168, 85, 247, 0.2) 60%, transparent 90%)',
            filter: 'blur(80px)',
            transform: 'rotate(-25deg) scale(1.2)',
            animation: isAnimated ? 'gradientShift 15s ease-in-out infinite' : 'none',
            transitionDelay: '200ms'
          }}
        ></div>
        
        {/* Blue indigo flow */}
        <div 
          className={`absolute top-1/4 right-0 w-80 h-80 transition-all duration-1500 ease-out ${
            isAnimated ? 'opacity-85 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.9) 0%, rgba(59, 130, 246, 0.5) 40%, rgba(147, 197, 253, 0.3) 70%, transparent 100%)',
            filter: 'blur(90px)',
            transform: 'rotate(35deg) scale(0.9)',
            animation: isAnimated ? 'rotateGradient 20s linear infinite' : 'none',
            transitionDelay: '400ms'
          }}
        ></div>
        
        {/* Cyan energy burst */}
        <div 
          className={`absolute bottom-10 left-0 w-72 h-72 transition-all duration-1500 ease-out ${
            isAnimated ? 'opacity-75 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.7) 0%, rgba(147, 197, 253, 0.4) 50%, rgba(59, 130, 246, 0.2) 80%, transparent 100%)',
            filter: 'blur(70px)',
            transform: 'rotate(-45deg) scale(1.1)',
            transitionDelay: '600ms'
          }}
        ></div>
        
        {/* Pink magenta accent */}
        <div 
          className={`absolute bottom-0 right-1/3 w-64 h-64 transition-all duration-1500 ease-out ${
            isAnimated ? 'opacity-70 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, rgba(219, 39, 119, 0.4) 50%, rgba(147, 51, 234, 0.2) 80%, transparent 100%)',
            filter: 'blur(85px)',
            transform: 'rotate(60deg) scale(0.8)',
            transitionDelay: '800ms'
          }}
        ></div>
        
        {/* Center ambient wash */}
        <div 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full transition-all duration-2000 ease-out ${
            isAnimated ? 'opacity-15 scale-100' : 'opacity-0 scale-90'
          }`}
          style={{
            background: 'radial-gradient(ellipse 80% 60%, rgba(99, 102, 241, 0.3) 0%, rgba(147, 51, 234, 0.2) 30%, rgba(59, 130, 246, 0.1) 60%, transparent 100%)',
            filter: 'blur(120px)',
            transitionDelay: '300ms'
          }}
        ></div>
        
        {/* Real Static Noise Effect */}
        <div 
          className={`absolute inset-0 mix-blend-screen transition-opacity duration-1500 ease-out ${
            isAnimated ? 'opacity-5' : 'opacity-0'
          }`}
          style={{
            backgroundImage: 'url(https://i.imgur.com/rYp9BvZ.png)',
            backgroundSize: '400px 400px',
            backgroundRepeat: 'repeat',
            animation: isAnimated ? 'staticMove 8s linear infinite' : 'none',
            transitionDelay: '1000ms'
          }}
        ></div>
        
        {/* Dark overlay for text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.4) 100%)'
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-20 pt-16 pb-32 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className={`transition-all duration-1000 ease-out ${
            isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}>
            {/* Main Heading */}
            <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Ready to{" "}
              <span 
                className="bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent"
                style={{
                  textShadow: '0 0 30px rgba(255,255,255,0.5)'
                }}
              >
                Transform
              </span>
              {" "}Your Vision?
            </h2>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-100">
              Let's build something extraordinary together. From AI-powered platforms to cutting-edge web applications, 
              we turn ambitious ideas into reality.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 ease-out ${
              isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`} style={{ transitionDelay: '400ms' }}>
              {/* Primary CTA */}
              <button 
                onClick={() => window.open('https://cal.com/bhyte-lwy0r0/30min?overlayCalendar=true', '_blank')}
                className="px-10 py-5 rounded-full font-semibold text-black bg-gradient-to-r from-white to-gray-100 hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
              >
                Book a Free Consultation
              </button>

              {/* Secondary CTA */}
              <button 
                onClick={() => {
                  const element = document.getElementById('work');
                  if (element) {
                    element.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }
                }}
                className="px-10 py-5 rounded-full font-semibold text-white bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border border-gray-600 hover:border-gray-500"
              >
                View Our Work
              </button>
            </div>


          </div>
        </div>
      </div>

      {/* Floating Elements for Extra Visual Interest */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        {/* Floating Orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
            filter: 'blur(20px)',
            animation: 'float 6s ease-in-out infinite'
          }}
        ></div>
        
        <div 
          className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
            filter: 'blur(15px)',
            animation: 'float 8s ease-in-out infinite reverse'
          }}
        ></div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes rotateGradient {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes gradientShift {
          0%, 100% { 
            background-position: 0% 50%;
          }
          50% { 
            background-position: 100% 50%;
          }
        }

        @keyframes staticMove {
          0% { 
            background-position: 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
          }
          25% { 
            background-position: 1px 1px, -1px 0px, 1px -1px, 0px 1px, -1px -1px;
          }
          50% { 
            background-position: -1px 1px, 1px 1px, 0px 0px, -1px 0px, 1px 0px;
          }
          75% { 
            background-position: 0px -1px, 0px 1px, -1px 1px, 1px -1px, 0px 0px;
          }
          100% { 
            background-position: 1px 0px, -1px -1px, 1px 1px, 0px -1px, -1px 1px;
          }
        }
      `}</style>
    </section>
  );
}
