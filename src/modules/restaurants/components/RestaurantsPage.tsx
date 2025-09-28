import React, { useState, useEffect } from 'react';

interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: number;
  cuisine: string;
  image?: string;
}

const RestaurantsPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now
    const mockRestaurants: Restaurant[] = [
      {
        id: '1',
        name: 'Shannon\'s Coastal Kitchen',
        address: '123 Ocean Drive, Bangkok',
        rating: 4.8,
        cuisine: 'Thai Fusion',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400'
      },
      {
        id: '2',
        name: 'The Golden Dragon',
        address: '456 Chinatown, Bangkok',
        rating: 4.6,
        cuisine: 'Chinese',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'
      },
      {
        id: '3',
        name: 'Bangkok Bistro',
        address: '789 Sukhumvit Road, Bangkok',
        rating: 4.4,
        cuisine: 'Thai',
        image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400'
      }
    ];

    setTimeout(() => {
      setRestaurants(mockRestaurants);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading restaurants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Restaurants</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {restaurant.image && (
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{restaurant.name}</h3>
                <p className="text-gray-600 mb-2">{restaurant.address}</p>
                <p className="text-sm text-gray-500 mb-3">{restaurant.cuisine}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 text-gray-700">{restaurant.rating}</span>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantsPage;
