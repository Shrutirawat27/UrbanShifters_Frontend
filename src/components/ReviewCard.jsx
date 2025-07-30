import React from 'react';
import { Star, MapPin, Calendar } from 'lucide-react';

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {review.name.charAt(0).toUpperCase()}
          </div>
          
          {/* Name and Location */}
          <div>
            <h3 className="font-semibold text-gray-900">{review.name}</h3>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <MapPin className="h-3 w-3" />
              <span>{review.location}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          {renderStars(review.rating)}
        </div>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 leading-relaxed mb-4">
        "{review.review}"
      </p>

      {/* Date */}
      <div className="flex items-center space-x-1 text-sm text-gray-500">
        <Calendar className="h-3 w-3" />
        <span>{formatDate(review.date)}</span>
      </div>
    </div>
  );
};

export default ReviewCard;