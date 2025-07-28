"use client";

export default function OurServices() {
  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We offer a wide range of services to help you build and scale your software products. From initial concept to final launch, we&apos;ve got you covered.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Web Development</h3>
            <p className="text-gray-400">
              We build beautiful, responsive, and high-performance websites and web applications using the latest technologies.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">AI & Machine Learning</h3>
            <p className="text-gray-400">
              We help you leverage the power of AI and machine learning to build intelligent applications that solve real-world problems.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">UI/UX Design</h3>
            <p className="text-gray-400">
              We create intuitive and engaging user interfaces that provide a seamless user experience across all devices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
