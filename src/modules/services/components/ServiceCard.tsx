// [2024-12-19] - Service card component for displaying individual services
// Shows service information in a card format with rating, price, and features

import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Service Image */}
      <div className="h-48 bg-gray-200 relative">
        {service.images && service.images.length > 0 ? (
          <img
            src={service.images[0]}
            alt={service.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center">
              <div 
                className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center"
                style={{ backgroundColor: service.category.color }}
              >
                <span className="text-white text-xl">
                  {service.category.name.charAt(0)}
                </span>
              </div>
              <p className="text-gray-500 text-sm">No image available</p>
            </div>
          </div>
        )}
        
        {/* Featured Badge */}
        {service.isFeatured && (
          <div className="absolute top-2 left-2">
            <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Verified Badge */}
        {service.isVerified && (
          <div className="absolute top-2 right-2">
            <div className="bg-green-500 text-white p-1 rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Service Info */}
      <div className="p-4">
        {/* Category */}
        <div className="flex items-center mb-2">
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center mr-2"
            style={{ backgroundColor: service.category.color }}
          >
            <span className="text-white text-xs font-bold">
              {service.category.name.charAt(0)}
            </span>
          </div>
          <span className="text-sm text-gray-600">{service.category.name}</span>
        </div>

        {/* Service Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {service.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {service.description}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center mb-3">
          <div className="flex items-center mr-2">
            {renderStars(service.rating)}
          </div>
          <span className="text-sm font-medium text-gray-900 mr-1">
            {service.rating}
          </span>
          <span className="text-sm text-gray-500">
            ({service.reviewCount} reviews)
          </span>
        </div>

        {/* Price Range */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-semibold text-gray-900">
            {service.priceRange}
          </span>
          {service.distance && (
            <span className="text-sm text-gray-500">
              {service.distance.toFixed(1)} km away
            </span>
          )}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-3">
          {service.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
          {service.features.length > 3 && (
            <span className="text-xs text-gray-500">
              +{service.features.length - 3} more
            </span>
          )}
        </div>

        {/* Contact Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{service.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
