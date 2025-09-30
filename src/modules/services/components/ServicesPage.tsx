// [2024-12-19] - Main Services page component for LocalPlus consumer app
// Provides service discovery, filtering, and browsing functionality

import React, { useState, useEffect } from 'react';
import { Service, ServiceCategory, ServiceSearchParams, SERVICE_CATEGORIES } from '../types';
import ServiceCard from './ServiceCard';
import CategoryFilter from './CategoryFilter';
import ServiceModal from './ServiceModal';

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Mock data for services - in production this would come from API
  useEffect(() => {
    const mockServices: Service[] = [
      {
        id: '1',
        name: 'Serenity Spa & Wellness',
        category: SERVICE_CATEGORIES[0], // Beauty & Wellness
        description: 'Full-service spa offering massage, facials, and wellness treatments in a tranquil environment.',
        address: '123 Wellness Street, Hua Hin',
        latitude: 12.5683,
        longitude: 99.9576,
        phone: '+66 32 123 456',
        email: 'info@serenityspa.com',
        website: 'https://serenityspa.com',
        rating: 4.8,
        reviewCount: 127,
        priceRange: '$$$',
        businessHours: {
          monday: { open: '09:00', close: '18:00', isClosed: false },
          tuesday: { open: '09:00', close: '18:00', isClosed: false },
          wednesday: { open: '09:00', close: '18:00', isClosed: false },
          thursday: { open: '09:00', close: '18:00', isClosed: false },
          friday: { open: '09:00', close: '19:00', isClosed: false },
          saturday: { open: '09:00', close: '19:00', isClosed: false },
          sunday: { open: '10:00', close: '17:00', isClosed: false }
        },
        images: ['/images/spa1.jpg', '/images/spa2.jpg'],
        features: ['Massage', 'Facial Treatments', 'Wellness Packages', 'Couples Services'],
        isVerified: true,
        isFeatured: true,
        distance: 0.8
      },
      {
        id: '2',
        name: 'FitLife Gym & Training',
        category: SERVICE_CATEGORIES[1], // Fitness & Health
        description: 'Modern fitness center with personal training, group classes, and state-of-the-art equipment.',
        address: '456 Fitness Avenue, Hua Hin',
        latitude: 12.5700,
        longitude: 99.9600,
        phone: '+66 32 234 567',
        email: 'hello@fitlifegym.com',
        website: 'https://fitlifegym.com',
        rating: 4.6,
        reviewCount: 89,
        priceRange: '$$',
        businessHours: {
          monday: { open: '06:00', close: '22:00', isClosed: false },
          tuesday: { open: '06:00', close: '22:00', isClosed: false },
          wednesday: { open: '06:00', close: '22:00', isClosed: false },
          thursday: { open: '06:00', close: '22:00', isClosed: false },
          friday: { open: '06:00', close: '22:00', isClosed: false },
          saturday: { open: '08:00', close: '20:00', isClosed: false },
          sunday: { open: '08:00', close: '20:00', isClosed: false }
        },
        images: ['/images/gym1.jpg', '/images/gym2.jpg'],
        features: ['Personal Training', 'Group Classes', 'Cardio Equipment', 'Weight Training'],
        isVerified: true,
        isFeatured: false,
        distance: 1.2
      },
      {
        id: '3',
        name: 'Legal Solutions Hua Hin',
        category: SERVICE_CATEGORIES[2], // Professional Services
        description: 'Comprehensive legal services including property law, business law, and immigration assistance.',
        address: '789 Business Plaza, Hua Hin',
        latitude: 12.5650,
        longitude: 99.9550,
        phone: '+66 32 345 678',
        email: 'contact@legalsolutionshh.com',
        website: 'https://legalsolutionshh.com',
        rating: 4.9,
        reviewCount: 45,
        priceRange: '$$$',
        businessHours: {
          monday: { open: '09:00', close: '17:00', isClosed: false },
          tuesday: { open: '09:00', close: '17:00', isClosed: false },
          wednesday: { open: '09:00', close: '17:00', isClosed: false },
          thursday: { open: '09:00', close: '17:00', isClosed: false },
          friday: { open: '09:00', close: '17:00', isClosed: false },
          saturday: { open: '10:00', close: '14:00', isClosed: false },
          sunday: { open: '10:00', close: '14:00', isClosed: true }
        },
        images: ['/images/legal1.jpg'],
        features: ['Property Law', 'Business Law', 'Immigration', 'Consultation'],
        isVerified: true,
        isFeatured: false,
        distance: 0.5
      }
    ];

    // Simulate API loading
    setTimeout(() => {
      setServices(mockServices);
      setFilteredServices(mockServices);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter services based on category and search query
  useEffect(() => {
    let filtered = services;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category.id === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.features.some(feature => 
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    setFilteredServices(filtered);
  }, [services, selectedCategory, searchQuery]);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Local Services
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover the best local services in Hua Hin
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={SERVICE_CATEGORIES}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => handleServiceClick(service)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Service Modal */}
        {selectedService && (
          <ServiceModal
            service={selectedService}
            isOpen={!!selectedService}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
