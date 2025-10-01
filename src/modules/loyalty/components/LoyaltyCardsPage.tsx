import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Home, Search, MessageCircle, User, CreditCard } from 'lucide-react';

interface LoyaltyCard {
  id: string;
  businessName: string;
  stampsCollected: number;
  stampsRequired: number;
  reward: string;
  isCompleted: boolean;
  color: string;
}

const LoyaltyCardsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loyaltyCards, setLoyaltyCards] = useState<LoyaltyCard[]>([]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoyaltyCards([
        {
          id: 'cafe-aroma',
          businessName: 'Cafe Aroma',
          stampsCollected: 3,
          stampsRequired: 10,
          reward: 'Free Coffee',
          isCompleted: false,
          color: 'green'
        },
        {
          id: 'blue-wave-spa',
          businessName: 'Blue Wave Spa',
          stampsCollected: 7,
          stampsRequired: 8,
          reward: 'Free Massage',
          isCompleted: false,
          color: 'blue'
        },
        {
          id: 'golden-palace-thai',
          businessName: 'Golden Palace Thai',
          stampsCollected: 12,
          stampsRequired: 12,
          reward: 'Free Dessert',
          isCompleted: true,
          color: 'purple'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-500';
      case 'blue': return 'bg-blue-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 pb-20 max-w-md mx-auto relative hide-scrollbar" style={{ height: '100vh', overflowY: 'auto' }}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading loyalty cards...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pb-20 max-w-md mx-auto relative hide-scrollbar" style={{ height: '100vh', overflowY: 'auto' }}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex items-center">
            <Star className="w-5 h-5 text-gray-600 mr-2" />
            <h1 className="text-lg font-bold text-gray-900">My Loyalty Cards</h1>
          </div>
          <div className="w-8" />
        </div>
      </div>

      {/* Loyalty Cards */}
      <div className="p-4 space-y-4">
        {loyaltyCards.map((card) => {
          const progressPercentage = (card.stampsCollected / card.stampsRequired) * 100;
          
          return (
            <Link 
              key={card.id} 
              to={`/loyalty-card/${card.id}`}
              className="block bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className={`w-8 h-8 ${getColorClasses(card.color)} rounded flex items-center justify-center text-white font-bold text-sm mr-3`}>
                    {card.businessName.split(' ').map(word => word[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{card.businessName}</h3>
                    <p className="text-sm text-gray-600">{card.stampsCollected} / {card.stampsRequired} stamps</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  card.isCompleted 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {card.isCompleted ? 'Completed' : 'Active'}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className={`${getColorClasses(card.color)} h-2 rounded-full transition-all duration-300`}
                  style={{width: `${progressPercentage}%`}}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Prize: {card.reward}</span>
                <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm">View</button>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          <Link to="/" className="flex flex-col items-center py-2 px-3 text-gray-600">
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/restaurants" className="flex flex-col items-center py-2 px-3 text-gray-600">
            <Search className="w-5 h-5" />
            <span className="text-xs mt-1">Explore</span>
          </Link>
          <div className="flex flex-col items-center py-2 px-3 text-gray-600">
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs mt-1">AI Assistant</span>
          </div>
          <Link to="/savings-passport" className="flex flex-col items-center py-2 px-3 text-gray-600">
            <CreditCard className="w-5 h-5" />
            <span className="text-xs mt-1">Passport</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center py-2 px-3 text-gray-600">
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyCardsPage;

