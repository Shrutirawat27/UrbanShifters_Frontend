import React from 'react';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ service, featured, onClick }) => {
  return (
    <div 
      className={`relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${featured ? 'border-2 border-blue-500' : ''}`}
      onClick={() => onClick(service)}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 bg-white">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <button 
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onClick(service);
          }}
        >
          Learn more <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
      {featured && (
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Popular
        </div>
      )}
    </div>
  );
};

export default ServiceCard;