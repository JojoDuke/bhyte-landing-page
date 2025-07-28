"use client";

export default function Pricing() {
  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Pricing</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We offer flexible pricing plans to suit your needs. Choose the plan that&apos;s right for you.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Basic</h3>
            <p className="text-4xl font-bold mb-4">$999</p>
            <p className="text-gray-400 mb-4">per month</p>
            <ul className="text-gray-400 space-y-2">
              <li>1 Website</li>
              <li>10 GB Storage</li>
              <li>100 GB Bandwidth</li>
              <li>24/7 Support</li>
            </ul>
          </div>
          <div className="bg-blue-600 p-8 rounded-lg text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Pro</h3>
            <p className="text-4xl font-bold mb-4">$1999</p>
            <p className="mb-4">per month</p>
            <ul className="space-y-2">
              <li>5 Websites</li>
              <li>50 GB Storage</li>
              <li>500 GB Bandwidth</li>
              <li>24/7 Support</li>
            </ul>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
            <p className="text-4xl font-bold mb-4">Contact Us</p>
            <p className="text-gray-400 mb-4">for a custom quote</p>
            <ul className="text-gray-400 space-y-2">
              <li>Unlimited Websites</li>
              <li>Unlimited Storage</li>
              <li>Unlimited Bandwidth</li>
              <li>24/7 Support</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
