"use client";

export default function FAQs() {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Have a question? We've got answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-900 p-6 rounded-lg mb-4">
            <h3 className="text-xl font-bold mb-2">How long does it take to build a website?</h3>
            <p className="text-gray-400">
              The timeline for building a website depends on the complexity of the project. A simple website can take as little as a few weeks, while a more complex project can take several months.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg mb-4">
            <h3 className="text-xl font-bold mb-2">How much does a website cost?</h3>
            <p className="text-gray-400">
              The cost of a website depends on the scope of the project. We offer flexible pricing plans to suit your needs. Contact us for a custom quote.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg mb-4">
            <h3 className="text-xl font-bold mb-2">Do you offer support and maintenance?</h3>
            <p className="text-gray-400">
              Yes, we offer ongoing support and maintenance to ensure your website is always up-to-date and running smoothly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
