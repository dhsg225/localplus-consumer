// [2025-01-30] - Mobile-first PWA with real Supabase database integration
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with proper environment variable handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('🏪 Supabase environment variables not configured. Using mock data.');
}

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export interface ProductionRestaurant {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  description: string;
  status: 'active' | 'inactive';
  photo_gallery?: any[]; // For storing Google Places photo data
  
  // Enhanced fields for Google Places integration
  google_place_id?: string;
  google_types?: string[];
  google_primary_type?: string;
  cuisine_types_google?: string[];
  cuisine_types_localplus?: string[];
  cuisine_display_names?: string[];
  discovery_source?: 'google_places' | 'manual' | 'partner_signup';
  curation_status?: 'pending' | 'reviewed' | 'approved';
  
  // Existing enhanced data
  cuisine?: string[];
  priceRange?: number;
  rating?: number | null;
  reviewCount?: number | null;
  heroImage?: string;
  photoGallery?: string[];
  signatureDishes?: string[];
  openingHours?: string | null;
  features?: string[];
  loyaltyProgram?: {
    name: string;
    pointsMultiplier: number;
  } | null;
  currentPromotions?: string[];
}

export class RestaurantService {
  // [2025-01-30] - Mobile-first PWA with real Supabase database integration
  async getRestaurantsByLocation(location: string): Promise<ProductionRestaurant[]> {
    try {
      console.log('🏪 Loading restaurants for location:', location);

      // Check if Supabase is configured
      if (!supabase) {
        console.log('🏪 Supabase not configured - no restaurants available');
        return [];
      }

      // Try to load from real Supabase database first
      const { data: restaurants, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('partnership_status', 'active');

      if (error) {
        console.error('🏪 Supabase error:', error);
        throw new Error(`Supabase connection failed: ${error.message}`);
      }

      if (restaurants && restaurants.length > 0) {
        console.log('🏪 Found', restaurants.length, 'real restaurants from Supabase');
        
        // Transform Supabase data to our interface
        const transformedRestaurants: ProductionRestaurant[] = restaurants.map(restaurant => ({
            id: restaurant.id,
            name: restaurant.name,
            address: restaurant.address,
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
            phone: restaurant.phone || '',
            email: restaurant.email || '',
            description: restaurant.description || '',
            status: restaurant.partnership_status as 'active' | 'inactive',
            cuisine: restaurant.cuisine_types_localplus || ['Thai'],
            priceRange: 2, // Default price range
            rating: null, // No mock rating
            reviewCount: null, // No mock review count
            heroImage: restaurant.photo_gallery && Array.isArray(restaurant.photo_gallery) && restaurant.photo_gallery.length > 0 
              ? restaurant.photo_gallery[0] 
              : null, // No fallback image - let the UI handle missing images
            photoGallery: restaurant.photo_gallery && Array.isArray(restaurant.photo_gallery) && restaurant.photo_gallery.length > 0
              ? restaurant.photo_gallery 
              : [], // Full photo gallery array
            signatureDishes: [], // No mock dishes
            openingHours: null, // No mock hours
            features: [], // No mock features
            currentPromotions: [], // No mock promotions
            loyaltyProgram: null // No mock loyalty program
          }));

        return transformedRestaurants;
      }

      // No real data found - return empty array to show actual error
      console.log('🏪 No real restaurants found in Supabase database');
      return [];

    } catch (error) {
      console.error('🏪 Restaurant service error:', error);
      throw error; // Re-throw the error instead of hiding it with mock data
    }
  }


  // Get restaurants by curated cuisine types
  async getRestaurantsByCuisine(
    cuisineTypes: string[],
    location?: string
  ): Promise<ProductionRestaurant[]> {
    try {
      console.log('🍽️ Filtering restaurants by cuisine types:', cuisineTypes);
      
      // Get all restaurants and filter by cuisine
      const allRestaurants = await this.getRestaurantsByLocation(location || 'Bangkok');
      
      const filteredRestaurants = allRestaurants.filter(restaurant => 
        restaurant.cuisine && restaurant.cuisine.some(cuisine => 
          cuisineTypes.some(type => cuisine.toLowerCase().includes(type.toLowerCase()))
        )
      );

      console.log('🍽️ Found', filteredRestaurants.length, 'restaurants for cuisines:', cuisineTypes);
      return filteredRestaurants;

    } catch (error) {
      console.error('🍽️ Error querying by cuisine:', error);
      return [];
    }
  }

  // Get available cuisine categories
  async getCuisineCategories(): Promise<any[]> {
    try {
      // Return empty array - no mock data
      return [];

    } catch (error) {
      console.error('🏷️ Error in getCuisineCategories:', error);
      return [];
    }
  }

}

export const restaurantService = new RestaurantService(); 