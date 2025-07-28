"use client";

export default function About() {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">About Bhyte Software</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We are a passionate team of developers and designers dedicated to building high-quality, innovative software solutions. Our mission is to turn your ideas into reality.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-4">Our Story</h3>
            <p className="text-gray-400 mb-4">
              Founded in 2023, Bhyte Software started as a small team with a big vision. We saw a need for a software company that not only delivered exceptional products but also fostered a culture of creativity and collaboration.
            </p>
            <p className="text-gray-400">
              Today, we&apos;ve grown into a full-service studio, helping startups and enterprises alike to build the next generation of software.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4">Our Values</h3>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Innovation at the core of everything we do.</li>
              <li>Commitment to quality and excellence.</li>
              <li>Transparent and collaborative client relationships.</li>
              <li>Empowering our team to grow and succeed.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
