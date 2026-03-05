import { useEffect, useState } from 'react';
import { Wrench, Cpu, Network, HardDrive, Lightbulb, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase, Service } from '../lib/supabase';

const iconMap: Record<string, React.ReactNode> = {
  wrench: <Wrench className="h-8 w-8" />,
  cpu: <Cpu className="h-8 w-8" />,
  network: <Network className="h-8 w-8" />,
  'hard-drive': <HardDrive className="h-8 w-8" />,
  lightbulb: <Lightbulb className="h-8 w-8" />,
  shield: <Shield className="h-8 w-8" />,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('display_order');
    if (data) setServices(data);
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our IT Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive technology solutions tailored to your business needs. From repairs to strategic IT consulting, we've got you covered.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 ${
                  index % 2 === 0 ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                }`}>
                  {iconMap[service.icon] || <Wrench className="h-8 w-8" />}
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-green-600">{service.price_range}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-900 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Need Custom IT Solutions?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Every business is unique. Contact us to discuss your specific requirements and get a tailored solution.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <span>Get in Touch</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Service Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-600">
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Contact Us</h3>
              <p className="text-gray-600">Call or submit a service request online</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-600">
                2
              </div>
              <h3 className="font-bold text-lg mb-2">Diagnosis</h3>
              <p className="text-gray-600">We assess the issue and provide a quote</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-600">
                3
              </div>
              <h3 className="font-bold text-lg mb-2">Service</h3>
              <p className="text-gray-600">Expert repair or installation service</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-green-600">
                4
              </div>
              <h3 className="font-bold text-lg mb-2">Follow-up</h3>
              <p className="text-gray-600">Quality check and warranty support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
