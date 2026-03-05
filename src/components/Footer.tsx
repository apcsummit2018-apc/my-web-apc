import { Link } from 'react-router-dom';
import { Monitor, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Monitor className="h-8 w-8 text-green-400" />
              <div>
                <h3 className="font-bold text-lg">ASOKE PRASANMIT</h3>
                <p className="text-sm text-green-400">COMPUTER.CO.,LTD</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted IT support partner in Bangkok. Professional computer services and solutions since 1997.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-300 hover:text-green-400 transition-colors">Services</Link></li>
              <li><Link to="/shop" className="text-gray-300 hover:text-green-400 transition-colors">Shop</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-green-400 transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-green-400 transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-green-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>On-Site IT Support</li>
              <li>Hardware Repair</li>
              <li>Network Setup</li>
              <li>Data Recovery</li>
              <li>IT Consulting</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>90 ซอยอนามัย ถนนศรีนครินทร์ แขวงสวนหลวง <br />
                       เขตสวนหลวง กรุงเทพมหานคร 10250</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span>Main: 02-321-9939</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span>sales@asoke-computer.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Monday - Friday: 08:00 AM - 17:30 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} ASOKE PRASANMIT COMPUTER.CO.,LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
