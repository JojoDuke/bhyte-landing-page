"use client";

export default function OurProcess() {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Process</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We follow a proven process to ensure the successful delivery of your project. Our process is designed to be transparent, collaborative, and efficient.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="bg-gray-900 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">1. Discovery</h3>
            <p className="text-gray-400">
              We start by understanding your goals, requirements, and target audience.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">2. Design</h3>
            <p className="text-gray-400">
              We create a beautiful and intuitive design that aligns with your brand and vision.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">3. Development</h3>
            <p className="text-gray-400">
              We build your product using the latest technologies and best practices.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">4. Launch</h3>
            <p className="text-gray-400">
              We deploy your product to the world and provide ongoing support and maintenance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}