// [2024-12-19] - Event card component for displaying individual events
// Shows event information in a card format with date, time, location, and price

import React from 'react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusBadge = () => {
    switch (event.status) {
      case 'upcoming':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Upcoming</span>;
      case 'ongoing':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Live Now</span>;
      case 'completed':
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Completed</span>;
      case 'cancelled':
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Event Image */}
      <div className="h-48 bg-gray-200 relative">
        {event.images && event.images.length > 0 ? (
          <img
            src={event.images[0]}
            alt={event.title}
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
                style={{ backgroundColor: event.category.color }}
              >
                <span className="text-white text-xl">
                  {event.category.name.charAt(0)}
                </span>
              </div>
              <p className="text-gray-500 text-sm">No image available</p>
            </div>
          </div>
        )}
        
        {/* Featured Badge */}
        {event.isFeatured && (
          <div className="absolute top-2 left-2">
            <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          {getStatusBadge()}
        </div>

        {/* Free/Paid Badge */}
        <div className="absolute bottom-2 left-2">
          {event.isFree ? (
            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              FREE
            </span>
          ) : (
            <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {event.price.currency} {event.price.amount}
            </span>
          )}
        </div>
      </div>

      {/* Event Info */}
      <div className="p-4">
        {/* Category */}
        <div className="flex items-center mb-2">
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center mr-2"
            style={{ backgroundColor: event.category.color }}
          >
            <span className="text-white text-xs font-bold">
              {event.category.name.charAt(0)}
            </span>
          </div>
          <span className="text-sm text-gray-600">{event.category.name}</span>
        </div>

        {/* Event Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Date and Time */}
        <div className="flex items-center mb-2 text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDate(event.date)}</span>
          <span className="mx-2">•</span>
          <span>{formatTime(event.startTime)}</span>
        </div>

        {/* Location */}
        <div className="flex items-center mb-3 text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{event.location.name}</span>
        </div>

        {/* Attendees */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{event.attendees}/{event.capacity} attending</span>
          </div>
          {event.distance && (
            <span className="text-sm text-gray-500">
              {event.distance.toFixed(1)} km away
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {event.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {event.tags.length > 3 && (
            <span className="text-xs text-gray-500">
              +{event.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Organizer */}
        <div className="flex items-center text-sm text-gray-500">
          <span>by {event.organizer.name}</span>
          {event.organizer.isVerified && (
            <svg className="w-4 h-4 ml-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
