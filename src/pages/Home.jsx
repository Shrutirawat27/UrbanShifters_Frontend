import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import ServiceModal from '../components/ServiceModal';
import { services } from '../data/dummyData';
import { CheckCircle, Shield, Clock, Award, Star } from 'lucide-react';

const Home = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const whyChooseUs = [
    {
      icon: Shield,
      title: "Fully Insured",
      description: "Complete protection for your belongings during transit"
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "99% on-time delivery rate with real-time tracking"
    },
    {
      icon: Award,
      title: "Expert Team",
      description: "Trained professionals with 15+ years experience"
    },
    {
      icon: CheckCircle,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee or your money back"
    }
  ];

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/reviews`);
        const approved = res.data.filter((r) => r.approved);
        setReviews(approved);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      }
    };
    fetchApprovedReviews();
  }, []);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));

  return (
    <div>
      <HeroSection />

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From home relocation to office shifting, we provide comprehensive moving solutions 
              tailored to your specific needs across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                featured={index === 1}
                onClick={() => handleOpenModal(service)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/services"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              View All Services
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose UrbanShifters?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're not just another moving company. Here's what makes us different and why 
              thousands of customers trust us with their precious belongings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
<section className="py-16 bg-gray-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-black mb-10 max-w-2xl mx-auto">
            Don’t just take our word for it. Here's what our satisfied customers have to say about their UrbanShifters experience.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.length === 0 ? (
              <p className="col-span-full text-blue-100">No reviews yet</p>
            ) : (
              reviews.slice(0, 6).map((review) => (
                <div
                  key={review._id}
                  className="bg-white text-gray-800 p-6 rounded-lg shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold">{review.name}</h4>
                    <div className="flex items-center">{renderStars(review.rating)}</div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{review.message}</p>
                   <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                  
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Move with UrbanShifters?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a free, no-obligation quote today and experience the difference 
            of working with India's most trusted moving professionals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              Get Free Quote Now
            </a>
            <a
              href="tel:+919876543210"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Call Now: +91 98765 43210
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      <ServiceModal 
        service={selectedService} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default Home;
