import { Users, Award, Globe } from 'lucide-react';

export function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Mission Section */}
      <section className="text-center mb-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          To empower farmers with data-driven insights and sustainable practices,
          ensuring optimal crop yields while preserving our environment for future generations.
        </p>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="text-center">
          <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <div className="text-4xl font-bold text-gray-900">10,000+</div>
          <div className="text-gray-600">Farmers Helped</div>
        </div>
        <div className="text-center">
          <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <div className="text-4xl font-bold text-gray-900">95%</div>
          <div className="text-gray-600">Accuracy Rate</div>
        </div>
        <div className="text-center">
          <Globe className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <div className="text-4xl font-bold text-gray-900">50+</div>
          <div className="text-gray-600">Countries Served</div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white rounded-lg shadow-sm p-8 mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            Founded in 2024, Farming Assistant emerged from a simple yet powerful idea:
            to make sustainable farming accessible to everyone through technology.
          </p>
          <p className="mb-4">
            Our team of agricultural experts, data scientists, and developers work
            together to provide farmers with the most accurate and actionable
            recommendations for their crops.
          </p>
          <p>
            We believe that by combining traditional farming wisdom with modern
            technology, we can create a more sustainable and productive agricultural
            future.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'John Smith',
              role: 'Agricultural Expert',
              image: 'https://via.placeholder.com/150'
            },
            {
              name: 'Sarah Johnson',
              role: 'Data Scientist',
              image: 'https://via.placeholder.com/150'
            },
            {
              name: 'Michael Brown',
              role: 'Software Engineer',
              image: 'https://via.placeholder.com/150'
            }
          ].map((member) => (
            <div key={member.name} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}