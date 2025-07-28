"use client";

export default function Testimonials() {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gray-900 p-8 rounded-lg">
            <p className="text-gray-400 mb-4">
              “Bhyte transformed our vision into a true reality. Their attention to detail and commitment to quality are unmatched. We couldn&apos;t be happier with the final product.”
            </p>
            <div className="flex items-center">
              <div>
                <p className="font-bold">Jane Doe</p>
                <p className="text-sm text-gray-500">CEO, Company A</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg">
            <p className="text-gray-400 mb-4">
              “Working with Bhyte Software was a fantastic experience. They are a team of true professionals who are passionate about what they do. I highly recommend them to anyone looking for a top-tier software development partner.”
            </p>
            <div className="flex items-center">
              <div>
                <p className="font-bold">John Smith</p>
                <p className="text-sm text-gray-500">CTO, Company B</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
