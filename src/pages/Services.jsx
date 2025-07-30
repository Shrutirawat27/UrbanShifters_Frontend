import React, { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import ServiceModal from '../components/ServiceModal';
import { services } from '../data/dummyData';
import { CheckCircle } from 'lucide-react';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const additionalServices = [
    'Free Pre-move Survey',
    'Professional Packing Materials',
    'Disassembly & Reassembly',
    'Insurance Coverage',
    'Real-time Tracking',
    '24/7 Customer Support'
  ];

  const processSteps = [
    { step: '01', title: 'Free Consultation', description: 'Contact us for a free consultation and detailed quote based on your specific requirements.' },
    { step: '02', title: 'Pre-move Survey', description: 'Our expert team visits your location to assess and plan the most efficient moving strategy.' },
    { step: '03', title: 'Professional Packing', description: 'We carefully pack your belongings using high-quality materials and proven techniques.' },
    { step: '04', title: 'Safe Transportation', description: 'Your items are transported safely using our modern fleet with real-time tracking.' },
    { step: '05', title: 'Delivery & Setup', description: 'We deliver and help set up your belongings at your new location with care.' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Our <span className="text-teal-300">Services</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            End-to-End Moving Solutions Tailored for Homes, Offices & Everything in Between.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Moving Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're moving your home, office, or need specialized transportation services, 
              we have the expertise and resources to handle it all.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                featured={index === 0}
                onClick={handleOpenModal}
              />
            ))}
          </div>

          {/* Additional Services */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-lg mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Additional Benefits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {additionalServices.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <CheckCircle className="text-teal-600 w-6 h-6 mt-1" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Process */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our proven step-by-step process ensures a smooth and stress-free moving experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{step.step}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let's Make Your Move Stress-Free
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Book your move today and enjoy a seamless relocation experience with UrbanShifters.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold text-lg rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
          >
            Get a Free Quote
          </a>
        </div>
      </section>

      {/* Modal Component */}
      <ServiceModal 
        service={selectedService} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default Services;