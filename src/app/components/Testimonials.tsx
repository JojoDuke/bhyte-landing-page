"use client";
import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gray-900 p-8 rounded-lg">
            <p className="text-gray-400 mb-6">
              &quot;Bhyte delivered solid work with impressive responsiveness. Their technical capabilities and quick communication made them feel like a true development partner who understood our vision.&quot;
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                <Image
                  src="/tstmnImages/chrisO.png"
                  alt="Chris Ogbuehi"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="font-bold text-white">Chris Ogbuehi</p>
                <p className="text-sm text-gray-400">CEO, GenY Solutions</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 p-8 rounded-lg">
            <p className="text-gray-400 mb-6">
              &quot;Working with Bhyte Software was a fantastic experience. They are a team of young professionals who are passionate about what they do. I highly recommend them to anyone looking for a top-tier software development partner.&quot;
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                <Image
                  src="/tstmnImages/pRsj.png"
                  alt="Prasanth Raj"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="font-bold text-white">Prasanth Raj</p>
                <p className="text-sm text-gray-400">Founder and CEO, FetchTalent AI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}