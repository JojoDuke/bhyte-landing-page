export default function Studio() {
  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Faint blue lights background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="pt-32 text-center animate-fadeInUp">
        <h1 className="text-6xl font-bold max-w-3xl mx-auto px-4 bg-gradient-to-r from-gray-200 to-gray-500 text-transparent bg-clip-text leading-tight">
          We deliver visually stunning AI and SaaS products built from the ground up
        </h1>
        <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
          Transforming ideas into intelligent realities
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="w-32 h-32 bg-blue-500 text-white font-semibold rounded-lg flex items-center justify-center hover:bg-blue-600 transition">
            Book a call
          </button>
          <button className="w-32 h-32 bg-gray-700 text-white font-semibold rounded-lg flex items-center justify-center hover:bg-gray-600 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
} 