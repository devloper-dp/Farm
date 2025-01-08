import { Link } from 'react-router-dom';
import { Leaf, Sun, CloudRain, Sprout } from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-5xl font-bold text-gray-900">
              Smart Farming Solutions for a Sustainable Future
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get personalized fertilizer recommendations based on soil health, weather patterns, and crop requirements.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/register"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="border border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
          <p className="mt-4 text-gray-600">Everything you need for sustainable farming</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Leaf className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Soil Analysis</h3>
            <p className="text-gray-600">
              Get detailed insights into your soil health and nutrient levels
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <CloudRain className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Weather Integration</h3>
            <p className="text-gray-600">
              Real-time weather data to optimize your farming decisions
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Sprout className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
            <p className="text-gray-600">
              Personalized fertilizer recommendations for optimal crop growth
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center text-white space-y-6">
            <h2 className="text-3xl font-bold">Ready to get started?</h2>
            <p className="text-lg">Join thousands of farmers using our platform</p>
            <Link
              to="/register"
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-gray-100"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}