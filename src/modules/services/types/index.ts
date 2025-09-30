// [2024-12-19] - Services module types for LocalPlus consumer app
// Defines TypeScript interfaces for local services discovery and management

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  website?: string;
  rating: number;
  reviewCount: number;
  priceRange: PriceRange;
  businessHours: BusinessHours;
  images: string[];
  features: string[];
  isVerified: boolean;
  isFeatured: boolean;
  distance?: number; // in kilometers
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  open: string; // "09:00"
  close: string; // "17:00"
  isClosed: boolean;
}

export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

export interface ServiceFilter {
  category?: string;
  priceRange?: PriceRange[];
  rating?: number;
  distance?: number; // in kilometers
  features?: string[];
  isOpenNow?: boolean;
}

export interface ServiceSearchParams {
  query?: string;
  location?: string;
  filters?: ServiceFilter;
  sortBy?: 'distance' | 'rating' | 'price' | 'name';
  page?: number;
  limit?: number;
}

// Service categories for the local services module
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'beauty',
    name: 'Beauty & Wellness',
    icon: 'spa',
    color: '#ec4899',
    description: 'Salons, spas, beauty treatments'
  },
  {
    id: 'fitness',
    name: 'Fitness & Health',
    icon: 'dumbbell',
    color: '#10b981',
    description: 'Gyms, personal trainers, health services'
  },
  {
    id: 'professional',
    name: 'Professional Services',
    icon: 'briefcase',
    color: '#6366f1',
    description: 'Legal, accounting, consulting'
  },
  {
    id: 'home',
    name: 'Home Services',
    icon: 'home',
    color: '#f59e0b',
    description: 'Cleaning, repairs, maintenance'
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: 'car',
    color: '#ef4444',
    description: 'Auto repair, car wash, services'
  },
  {
    id: 'education',
    name: 'Education & Training',
    icon: 'graduation-cap',
    color: '#8b5cf6',
    description: 'Classes, tutoring, workshops'
  }
];
