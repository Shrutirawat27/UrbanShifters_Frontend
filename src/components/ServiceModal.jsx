import React from 'react';
import { X } from 'lucide-react';

const ServiceModal = ({ service, isOpen, onClose }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>

          {/* Image */}
          <div className="relative h-64 md:h-72 overflow-hidden rounded-t-xl">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                {service.title}
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 text-gray-700">
            <p className="text-lg leading-relaxed mb-4 font-medium">
              {service.description}
            </p>

            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>✔️ Professional team</li>
              <li>✔️ Insured & secure</li>
              <li>✔️ Timely delivery</li>
            </ul>

            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2">
                Interested in our {service.title}?
              </h3>
              <p className="mb-4">Contact us now for a free consultation and quote!</p>
              <button 
                onClick={onClose}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;