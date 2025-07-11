export default function Studio() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Studio</h1>
        <p className="text-gray-300 text-lg mb-4">
          Welcome to Bhyte Studio - where creativity meets AI innovation.
        </p>
        <p className="text-gray-400 mb-6">
          Our studio environment provides powerful tools for building, testing, and deploying AI-native applications. 
          From concept to production, Studio streamlines your development workflow with intelligent automation and 
          collaborative features.
        </p>
        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="space-y-2 text-gray-300">
            <li>• Visual AI model builder</li>
            <li>• Real-time collaboration</li>
            <li>• Automated testing suites</li>
            <li>• One-click deployment</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 