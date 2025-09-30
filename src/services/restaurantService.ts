// [2025-01-30] - Mobile-first PWA with mock data for immediate deployment
// TODO: Connect to real Supabase database

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
  rating?: number;
  reviewCount?: number;
  heroImage?: string;
  signatureDishes?: string[];
  openingHours?: string;
  features?: string[];
  loyaltyProgram?: {
    name: string;
    pointsMultiplier: number;
  };
  currentPromotions?: string[];
}

export class RestaurantService {
  // [2025-01-30] - Mobile-first PWA with realistic mock data
  async getRestaurantsByLocation(location: string): Promise<ProductionRestaurant[]> {
    try {
      console.log('🏪 Loading restaurants for location:', location);
      
      // Mock data that matches the real Supabase structure
      const mockRestaurants: ProductionRestaurant[] = [
        {
          id: '1',
          name: 'Mae Keb Khanomthai',
          address: '250/12 Phet Kasem Road, Bangkok',
          latitude: 13.7563,
          longitude: 100.5018,
          phone: '+66 2 123 4567',
          email: 'info@maekeb.com',
          description: 'Authentic traditional Thai cuisine with time-honored recipes and flavors',
          status: 'active',
          cuisine: ['Thai Traditional'],
          priceRange: 2,
          rating: 4.4,
          reviewCount: 356,
          heroImage: '',
          signatureDishes: ['Pad Thai', 'Green Curry', 'Mango Sticky Rice'],
          openingHours: '11:00 AM - 10:00 PM',
          features: ['air-conditioning', 'parking', 'groups'],
          currentPromotions: ['Weekend brunch special'],
          loyaltyProgram: {
            name: 'Thai Heritage Club',
            pointsMultiplier: 2
          }
        },
        {
          id: '2',
          name: 'Seaside Grill & Bar',
          address: '123 Ocean Drive, Hua Hin',
          latitude: 12.5683,
          longitude: 99.9566,
          phone: '+66 32 123 456',
          email: 'info@seasidegrill.com',
          description: 'Fresh grilled seafood with ocean-to-table quality and authentic preparations',
          status: 'active',
          cuisine: ['Seafood', 'Grilled'],
          priceRange: 3,
          rating: 4.6,
          reviewCount: 234,
          heroImage: '',
          signatureDishes: ['Grilled Sea Bass', 'Tom Yum Talay', 'Seafood Platter'],
          openingHours: '5:00 PM - 11:00 PM',
          features: ['beachfront-view', 'outdoor-seating', 'parking'],
          currentPromotions: ['Happy Hour 5-7 PM'],
          loyaltyProgram: {
            name: 'Ocean Club',
            pointsMultiplier: 2
          }
        },
        {
          id: '3',
          name: 'Golden Palace Thai',
          address: '456 Sukhumvit Road, Bangkok',
          latitude: 13.7307,
          longitude: 100.5233,
          phone: '+66 2 234 5678',
          email: 'info@goldenpalace.com',
          description: 'Refined royal Thai cuisine with elegant presentation and sophisticated flavors',
          status: 'active',
          cuisine: ['Thai Royal'],
          priceRange: 4,
          rating: 4.8,
          reviewCount: 567,
          heroImage: '',
          signatureDishes: ['Royal Pad Thai', 'Massaman Beef', 'Golden Curry'],
          openingHours: '5:00 PM - 11:00 PM',
          features: ['parking', 'groups', 'reservations', 'private-dining'],
          currentPromotions: ['20% off dinner sets'],
          loyaltyProgram: {
            name: 'Royal Club',
            pointsMultiplier: 3
          }
        },
        {
          id: '4',
          name: 'Tokyo Sushi Bar',
          address: '789 Silom Road, Bangkok',
          latitude: 13.7295,
          longitude: 100.5342,
          phone: '+66 2 345 6789',
          email: 'info@tokyosushi.com',
          description: 'Traditional Japanese sushi and sashimi with premium ingredients',
          status: 'active',
          cuisine: ['Japanese', 'Sushi'],
          priceRange: 3,
          rating: 4.5,
          reviewCount: 189,
          heroImage: '',
          signatureDishes: ['Sushi Platter', 'Sashimi Selection', 'Chirashi Bowl'],
          openingHours: '11:30 AM - 10:00 PM',
          features: ['air-conditioning', 'groups'],
          currentPromotions: ['Free dessert with main course'],
          loyaltyProgram: {
            name: 'Sushi Circle',
            pointsMultiplier: 2
          }
        },
        {
          id: '5',
          name: 'Bangkok Bistro',
          address: '321 Thonglor, Bangkok',
          latitude: 13.7234,
          longitude: 100.5678,
          phone: '+66 2 456 7890',
          email: 'info@bangkokbistro.com',
          description: 'Modern Thai fusion with international influences',
          status: 'active',
          cuisine: ['Thai Fusion', 'International'],
          priceRange: 2,
          rating: 4.3,
          reviewCount: 145,
          heroImage: '',
          signatureDishes: ['Thai Basil Chicken', 'Coconut Curry', 'Sticky Rice'],
          openingHours: '10:00 AM - 9:00 PM',
          features: ['wifi', 'outdoor-seating'],
          currentPromotions: ['Early bird special'],
          loyaltyProgram: {
            name: 'Bistro Members',
            pointsMultiplier: 1
          }
        }
      ];

      console.log('🏪 Found', mockRestaurants.length, 'restaurants for', location);
      return mockRestaurants;
      
    } catch (error) {
      console.error('🏪 Restaurant service error:', error);
      return [];
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
      // Return mock cuisine categories for now
      return [
        { id: '1', name: 'Thai Traditional', display_name: 'Thai Traditional', is_active: true },
        { id: '2', name: 'Thai Royal', display_name: 'Thai Royal', is_active: true },
        { id: '3', name: 'Seafood', display_name: 'Seafood', is_active: true },
        { id: '4', name: 'Japanese', display_name: 'Japanese', is_active: true },
        { id: '5', name: 'Chinese', display_name: 'Chinese', is_active: true },
        { id: '6', name: 'International', display_name: 'International', is_active: true }
      ];

    } catch (error) {
      console.error('🏷️ Error in getCuisineCategories:', error);
      return [];
    }
  }

}

export const restaurantService = new RestaurantService(); 