// [2024-12-19] - Events module types for LocalPlus consumer app
// Defines TypeScript interfaces for local events discovery and management

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  date: Date;
  startTime: string; // "19:00"
  endTime: string; // "22:00"
  location: EventLocation;
  organizer: EventOrganizer;
  price: EventPrice;
  capacity: number;
  attendees: number;
  images: string[];
  tags: string[];
  isFeatured: boolean;
  isFree: boolean;
  isOnline: boolean;
  requiresRegistration: boolean;
  ageRestriction?: string; // "18+", "21+", "All Ages"
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  distance?: number; // in kilometers
}

export interface EventCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface EventLocation {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  venueType: 'indoor' | 'outdoor' | 'online';
  capacity?: number;
}

export interface EventOrganizer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  isVerified: boolean;
}

export interface EventPrice {
  type: 'free' | 'paid' | 'donation';
  amount?: number; // in THB
  currency: string;
  description?: string; // "Early bird discount available"
}

export interface EventFilter {
  category?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  priceType?: ('free' | 'paid')[];
  location?: string;
  isOnline?: boolean;
  ageRestriction?: string;
  tags?: string[];
}

export interface EventSearchParams {
  query?: string;
  location?: string;
  filters?: EventFilter;
  sortBy?: 'date' | 'popularity' | 'price' | 'distance';
  page?: number;
  limit?: number;
}

// Event categories for the local events module
export const EVENT_CATEGORIES: EventCategory[] = [
  {
    id: 'music',
    name: 'Music',
    icon: 'music',
    color: '#8b5cf6',
    description: 'Concerts, live music, DJ sets'
  },
  {
    id: 'food',
    name: 'Food & Dining',
    icon: 'utensils',
    color: '#ef4444',
    description: 'Food festivals, wine tastings, cooking classes'
  },
  {
    id: 'art',
    name: 'Art & Culture',
    icon: 'palette',
    color: '#f59e0b',
    description: 'Exhibitions, galleries, cultural events'
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    icon: 'activity',
    color: '#10b981',
    description: 'Sports events, fitness classes, tournaments'
  },
  {
    id: 'business',
    name: 'Business & Networking',
    icon: 'briefcase',
    color: '#6366f1',
    description: 'Conferences, workshops, networking events'
  },
  {
    id: 'nightlife',
    name: 'Nightlife',
    icon: 'moon',
    color: '#1f2937',
    description: 'Bars, clubs, late-night entertainment'
  },
  {
    id: 'shopping',
    name: 'Shopping & Markets',
    icon: 'shopping-bag',
    color: '#f59e0b',
    description: 'Markets, pop-ups, shopping events'
  },
  {
    id: 'wellness',
    name: 'Wellness & Health',
    icon: 'heart',
    color: '#ec4899',
    description: 'Yoga, meditation, wellness workshops'
  },
  {
    id: 'education',
    name: 'Education & Learning',
    icon: 'graduation-cap',
    color: '#8b5cf6',
    description: 'Workshops, seminars, educational events'
  },
  {
    id: 'family',
    name: 'Family & Kids',
    icon: 'users',
    color: '#06b6d4',
    description: 'Family-friendly events and activities'
  }
];
