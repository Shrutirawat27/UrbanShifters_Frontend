import React, { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import ServiceModal from '../components/ServiceModal';
import { services } from '../data/dummyData';
import { CheckCircle, ArrowRight, Phone } from 'lucide-react';

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

  // AdditionalServices and ProcessSteps here (unchanged)...
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
      {/* ... Existing sections like Hero, How it works, etc. (unchanged) ... */}

      {/* Main Services Grid */}
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

          {/* Include your Additional Services block here... */}
        </div>
      </section>

      {/* Include your ProcessSteps, Service Areas, and CTA here... */}

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
