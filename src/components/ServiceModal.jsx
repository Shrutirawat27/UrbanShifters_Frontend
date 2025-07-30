import React from 'react';
import { X } from 'lucide-react';

const ServiceModal = ({ service, isOpen, onClose }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal content */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl leading-6 font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="mt-2">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <p className="text-gray-700 mb-4">
                    {service.longDescription || service.description}
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-bold text-gray-900 mb-2">Service Includes:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {service.features?.map((feature, index) => (
                        <li key={index} className="text-gray-700">{feature}</li>
                      ))}
                      <li>Professional packing materials</li>
                      <li>Secure transportation</li>
                      <li>Insurance coverage</li>
                      <li>Real-time tracking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;