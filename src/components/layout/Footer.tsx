import { Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-green-600" />
              <span className="font-bold text-lg">Farming Assistant</span>
            </div>
            <p className="text-gray-600">
              Sustainable farming solutions for a better tomorrow
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Home</li>
              <li>About</li>
              <li>Features</li>
              <li>Contact</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Knowledge Base</li>
              <li>Research Papers</li>
              <li>Best Practices</li>
              <li>FAQs</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Email: support@farmingassistant.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Farm Street</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>© {new Date().getFullYear()} Farming Assistant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}