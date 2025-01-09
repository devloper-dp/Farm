import { 
    Leaf, CloudRain, Sun, Database, 
    BarChart2, BookOpen, Users, Shield 
  } from 'lucide-react';
  
  export function Features() {
    const features = [
      {
        icon: <Leaf className="w-8 h-8 text-green-600" />,
        title: 'Soil Health Analysis',
        description: 'Comprehensive analysis of soil nutrients, pH levels, and organic matter content.'
      },
      {
        icon: <CloudRain className="w-8 h-8 text-blue-600" />,
        title: 'Weather Integration',
        description: 'Real-time weather data and forecasts to optimize farming decisions.'
      },
      {
        icon: <Database className="w-8 h-8 text-purple-600" />,
        title: 'Smart Recommendations',
        description: 'AI-powered fertilizer recommendations based on multiple data points.'
      },
      {
        icon: <BarChart2 className="w-8 h-8 text-orange-600" />,
        title: 'Data Visualization',
        description: 'Clear and intuitive charts to track soil health and crop progress.'
      },
      {
        icon: <BookOpen className="w-8 h-8 text-red-600" />,
        title: 'Knowledge Base',
        description: 'Extensive library of farming best practices and research papers.'
      },
      {
        icon: <Users className="w-8 h-8 text-indigo-600" />,
        title: 'Community Support',
        description: 'Connect with other farmers and agricultural experts.'
      },
      {
        icon: <Shield className="w-8 h-8 text-gray-600" />,
        title: 'Data Security',
        description: 'Enterprise-grade security to protect your farming data.'
      },
      {
        icon: <Sun className="w-8 h-8 text-yellow-600" />,
        title: 'Sustainability Tracking',
        description: 'Monitor and improve your farm\'s environmental impact.'
      }
    ];
  
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Features & Capabilities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our platform helps you make data-driven decisions
            for sustainable farming
          </p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
  
        {/* Pricing Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
            <p className="text-gray-600">Choose the plan that fits your needs</p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Basic',
                price: 'Free',
                features: [
                  'Soil health analysis',
                  'Basic weather data',
                  'Community support',
                  'Knowledge base access'
                ]
              },
              {
                name: 'Pro',
                price: 'RS.29/mo',
                features: [
                  'Everything in Basic',
                  'Advanced analytics',
                  'Priority support',
                  'Custom recommendations'
                ]
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                features: [
                  'Everything in Pro',
                  'API access',
                  'Custom integrations',
                  'Dedicated support'
                ]
              }
            ].map((plan) => (
              <div
                key={plan.name}
                className="bg-white p-6 rounded-lg shadow-sm text-center"
              >
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-green-600 mb-4">
                  {plan.price}
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-gray-600">
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }