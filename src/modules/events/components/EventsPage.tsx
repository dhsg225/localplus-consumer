// [2024-12-19] - Main Events page component for LocalPlus consumer app
// Provides event discovery, filtering, and browsing functionality

import React, { useState, useEffect } from 'react';
import { Event, EventCategory, EventSearchParams, EVENT_CATEGORIES } from '../types';
import EventCard from './EventCard';
import CategoryFilter from './CategoryFilter';
import EventModal from './EventModal';

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Mock data for events - in production this would come from API
  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Hua Hin Jazz Festival 2024',
        description: 'A weekend of smooth jazz featuring local and international artists in the beautiful beach setting of Hua Hin.',
        category: EVENT_CATEGORIES[0], // Music
        date: new Date('2024-12-28'),
        startTime: '18:00',
        endTime: '23:00',
        location: {
          name: 'Hua Hin Beach',
          address: 'Beach Road, Hua Hin',
          latitude: 12.5683,
          longitude: 99.9576,
          venueType: 'outdoor',
          capacity: 500
        },
        organizer: {
          id: 'org1',
          name: 'Hua Hin Events Co.',
          email: 'info@huahinevents.com',
          phone: '+66 32 123 456',
          website: 'https://huahinevents.com',
          isVerified: true
        },
        price: {
          type: 'paid',
          amount: 800,
          currency: 'THB',
          description: 'Early bird tickets available'
        },
        capacity: 500,
        attendees: 342,
        images: ['/images/jazz1.jpg', '/images/jazz2.jpg'],
        tags: ['jazz', 'beach', 'outdoor', 'music'],
        isFeatured: true,
        isFree: false,
        isOnline: false,
        requiresRegistration: true,
        ageRestriction: 'All Ages',
        status: 'upcoming',
        distance: 0.5
      },
      {
        id: '2',
        title: 'Thai Cooking Workshop',
        description: 'Learn authentic Thai cooking techniques with local chefs. Includes market tour and hands-on cooking experience.',
        category: EVENT_CATEGORIES[1], // Food & Dining
        date: new Date('2024-12-22'),
        startTime: '09:00',
        endTime: '14:00',
        location: {
          name: 'Hua Hin Cooking School',
          address: '123 Cooking Street, Hua Hin',
          latitude: 12.5700,
          longitude: 99.9600,
          venueType: 'indoor',
          capacity: 20
        },
        organizer: {
          id: 'org2',
          name: 'Hua Hin Cooking School',
          email: 'classes@huahincooking.com',
          phone: '+66 32 234 567',
          website: 'https://huahincooking.com',
          isVerified: true
        },
        price: {
          type: 'paid',
          amount: 1200,
          currency: 'THB',
          description: 'Includes ingredients and lunch'
        },
        capacity: 20,
        attendees: 15,
        images: ['/images/cooking1.jpg'],
        tags: ['cooking', 'thai', 'workshop', 'food'],
        isFeatured: false,
        isFree: false,
        isOnline: false,
        requiresRegistration: true,
        ageRestriction: '12+',
        status: 'upcoming',
        distance: 1.2
      },
      {
        id: '3',
        title: 'Art Gallery Opening: Modern Thai Artists',
        description: 'Exhibition featuring contemporary Thai artists with live music and refreshments.',
        category: EVENT_CATEGORIES[2], // Art & Culture
        date: new Date('2024-12-20'),
        startTime: '19:00',
        endTime: '22:00',
        location: {
          name: 'Hua Hin Art Gallery',
          address: '456 Art Avenue, Hua Hin',
          latitude: 12.5650,
          longitude: 99.9550,
          venueType: 'indoor',
          capacity: 100
        },
        organizer: {
          id: 'org3',
          name: 'Hua Hin Art Gallery',
          email: 'info@huahinart.com',
          phone: '+66 32 345 678',
          website: 'https://huahinart.com',
          isVerified: true
        },
        price: {
          type: 'free',
          currency: 'THB'
        },
        capacity: 100,
        attendees: 67,
        images: ['/images/art1.jpg', '/images/art2.jpg'],
        tags: ['art', 'gallery', 'exhibition', 'culture'],
        isFeatured: false,
        isFree: true,
        isOnline: false,
        requiresRegistration: false,
        ageRestriction: 'All Ages',
        status: 'upcoming',
        distance: 0.8
      },
      {
        id: '4',
        title: 'Beach Yoga & Meditation',
        description: 'Morning yoga session on the beach followed by meditation. Perfect for beginners and experienced practitioners.',
        category: EVENT_CATEGORIES[7], // Wellness & Health
        date: new Date('2024-12-21'),
        startTime: '07:00',
        endTime: '08:30',
        location: {
          name: 'Hua Hin Beach (North End)',
          address: 'North Beach Road, Hua Hin',
          latitude: 12.5720,
          longitude: 99.9620,
          venueType: 'outdoor',
          capacity: 30
        },
        organizer: {
          id: 'org4',
          name: 'Hua Hin Wellness Center',
          email: 'wellness@huahinwellness.com',
          phone: '+66 32 456 789',
          website: 'https://huahinwellness.com',
          isVerified: true
        },
        price: {
          type: 'paid',
          amount: 300,
          currency: 'THB',
          description: 'Mats provided'
        },
        capacity: 30,
        attendees: 22,
        images: ['/images/yoga1.jpg'],
        tags: ['yoga', 'meditation', 'wellness', 'beach'],
        isFeatured: false,
        isFree: false,
        isOnline: false,
        requiresRegistration: true,
        ageRestriction: 'All Ages',
        status: 'upcoming',
        distance: 1.5
      }
    ];

    // Simulate API loading
    setTimeout(() => {
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter events based on category and search query
  useEffect(() => {
    let filtered = events;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category.id === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => 
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    setFilteredEvents(filtered);
  }, [events, selectedCategory, searchQuery]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
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
            Local Events
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover exciting events happening in Hua Hin
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
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
          categories={EVENT_CATEGORIES}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => handleEventClick(event)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Event Modal */}
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            isOpen={!!selectedEvent}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default EventsPage;
