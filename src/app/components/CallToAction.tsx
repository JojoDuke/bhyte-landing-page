"use client";

export default function CallToAction() {
  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-lg mb-8">
          Let's build something amazing together. Book a free consultation to discuss your project.
        </p>
        <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-200 transition-colors duration-300">
          Book a Call
        </button>
      </div>
    </section>
  );
}
