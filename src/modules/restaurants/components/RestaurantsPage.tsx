import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, MapPin, Star, Clock, Utensils, Heart, Phone } from 'lucide-react';
import { restaurantService } from '../../../services/restaurantService';

interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  cuisine: string[];
  priceRange: number;
  heroImage: string;
  signatureDishes: string[];
  isOpen: boolean;
  features: string[];
  openingHours: string;
  currentPromotions: string[];
  loyaltyProgram?: {
    name: string;
    pointsMultiplier: number;
  };
}

const RestaurantsPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('');

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      setLoading(true);
      console.log('🏪 Loading restaurants from Supabase...');
      
      // Load restaurants from Supabase via the restaurant service
      const productionRestaurants = await restaurantService.getRestaurantsByLocation('Bangkok');
      console.log('🏪 Loaded restaurants:', productionRestaurants.length);
      
      // Transform to our interface
      const transformedRestaurants: Restaurant[] = productionRestaurants.map(restaurant => ({
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        rating: restaurant.rating || 4.0,
        reviewCount: restaurant.reviewCount || 0,
        cuisine: restaurant.cuisine || ['Thai'],
        priceRange: restaurant.priceRange || 2,
        heroImage: restaurant.heroImage || '',
        signatureDishes: restaurant.signatureDishes || [],
        isOpen: restaurant.status === 'active',
        features: restaurant.features || [],
        openingHours: restaurant.openingHours || '11:00 AM - 10:00 PM',
        currentPromotions: restaurant.currentPromotions || [],
        loyaltyProgram: restaurant.loyaltyProgram
      }));
      
      setRestaurants(transformedRestaurants);
    } catch (error) {
      console.error('🏪 Error loading restaurants:', error);
      // Fallback to empty array
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCuisine = !selectedCuisine || restaurant.cuisine.includes(selectedCuisine);
    return matchesSearch && matchesCuisine;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading restaurants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-w-md mx-auto relative">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Restaurants</h1>
          <div className="w-5"></div>
        </div>
        
        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Cuisine Filter */}
        <div className="px-4 pb-3">
          <div className="flex space-x-2 overflow-x-auto">
            <button
              onClick={() => setSelectedCuisine('')}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedCuisine === '' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              All
            </button>
            {['Thai', 'Chinese', 'Japanese', 'Italian', 'Korean', 'Seafood'].map(cuisine => (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  selectedCuisine === cuisine 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Restaurant Cards */}
      <div className="px-4 py-4 space-y-4">
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-8">
            <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No restaurants found</p>
          </div>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Restaurant Image */}
              <div className="relative h-48 bg-gray-200">
                {restaurant.heroImage ? (
                  <img 
                    src={restaurant.heroImage} 
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Utensils className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                
                {/* Photo Count Badge */}
                <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  10 photos
                </div>
                
                {/* Swipe Indicators */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  ← Swipe
                </div>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  Swipe →
                </div>
                
                {/* Pagination Dots */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full"></div>
                  <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full"></div>
                </div>
              </div>

              {/* Restaurant Details */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{restaurant.name}</h3>
                    <p className="text-sm text-gray-600">{restaurant.cuisine.join(' • ')}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
                    <span className="ml-1 text-xs text-gray-500">({restaurant.reviewCount})</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {restaurant.signatureDishes.slice(0, 3).map((dish, index) => (
                    <span key={index} className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-xs">
                      {dish}
                    </span>
                  ))}
                </div>

                {/* Location and Hours */}
                <div className="space-y-1 mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{restaurant.address}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{restaurant.openingHours}</span>
                    </div>
                    <button className="text-orange-500 text-sm font-medium">
                      Call:
                    </button>
                  </div>
                </div>

                {/* Special Offer */}
                {restaurant.currentPromotions.length > 0 && (
                  <div className="bg-pink-100 rounded-lg p-3 mb-3">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🎉</span>
                      <span className="text-sm text-pink-600 font-medium">
                        {restaurant.currentPromotions[0]}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg font-medium">
                    View Menu
                  </button>
                  <button className="bg-gray-100 text-gray-600 p-2 rounded-lg">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="bg-gray-100 text-gray-600 p-2 rounded-lg">
                    <Phone className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RestaurantsPage;
