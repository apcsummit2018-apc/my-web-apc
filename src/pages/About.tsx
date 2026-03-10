import { Award, Users, Target, Heart } from 'lucide-react';

export default function About() {
  return (
    <div>
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Your trusted IT partner since 2010
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  
                </p>
                <p>
                  What started as a small computer repair shop has grown into a comprehensive IT solutions provider, trusted by hundreds of businesses and individuals throughout the region.
                </p>
                <p>
                  Our team of certified technicians combines technical expertise with a commitment to customer satisfaction, ensuring that every client receives personalized attention and effective solutions.
                </p>
                <p>
                  We pride ourselves on staying current with the latest technology trends while maintaining the personal touch that has made us a community favorite.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg"
                alt="Our Team"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-blue-900">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every service, ensuring the highest quality standards for our clients.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-blue-900">Integrity</h3>
              <p className="text-gray-600">
                Honest advice and transparent pricing. We build relationships based on trust.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-blue-900">Innovation</h3>
              <p className="text-gray-600">
                Staying ahead of technology trends to provide cutting-edge solutions.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-blue-900">Care</h3>
              <p className="text-gray-600">
                Every client matters. We treat your technology as if it were our own.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">By the Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600 font-semibold">Years in Business</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">5000+</div>
              <div className="text-gray-600 font-semibold">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600 font-semibold">Expert Technicians</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600 font-semibold">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Our Certifications</h2>
            <p className="text-xl text-blue-100 mb-8">
              Our technicians hold industry-recognized certifications
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-lg">
              <div className="bg-blue-800 px-6 py-3 rounded-lg">CompTIA A+</div>
              <div className="bg-blue-800 px-6 py-3 rounded-lg">CompTIA Network+</div>
              <div className="bg-blue-800 px-6 py-3 rounded-lg">Microsoft Certified</div>
              <div className="bg-blue-800 px-6 py-3 rounded-lg">Cisco CCNA</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
