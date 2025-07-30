// components/ServiceCard.jsx
import React from 'react';
import { Home, Building, Car, Warehouse, Package, Truck } from 'lucide-react';

const ServiceCard = ({ service, featured = false, onClick }) => {
  const getIcon = (iconName) => {
    const icons = {
      home: Home,
      building: Building,
      car: Car,
      warehouse: Warehouse,
      package: Package,
      truck: Truck,
    };
    const IconComponent = icons[iconName] || Package;
    return <IconComponent className="h-8 w-8" />;
  };

  return (
    <div className={`group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${
      featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
    }`}>
      {featured && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-center py-2 text-sm font-medium">
          Most Popular
        </div>
      )}

      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full text-blue-600">
          {getIcon(service.icon)}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
          {service.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          {service.description}
        </p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Professional team
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
            Insured & secure
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Timely delivery
          </div>
        </div>

        <button
          onClick={() => onClick(service)}
          className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
