import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Gift, Home, Search, MessageCircle, User, CreditCard } from 'lucide-react';

interface LoyaltyCardPageProps {
  cardId: string;
  businessName: string;
  stampsCollected: number;
  stampsRequired: number;
  reward: string;
  isCompleted: boolean;
}

const LoyaltyCardPage: React.FC<LoyaltyCardPageProps> = ({
  cardId,
  businessName,
  stampsCollected,
  stampsRequired,
  reward,
  isCompleted
}) => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScanForStamp = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      // In real app, this would update the stamp count
    }, 2000);
  };

  const handleRedeemPrize = () => {
    // In real app, this would redeem the prize
    alert(`Prize redeemed: ${reward}`);
  };

  const progressPercentage = (stampsCollected / stampsRequired) * 100;

  return (
    <div className="bg-gray-50 pb-20 max-w-md mx-auto relative hide-scrollbar" style={{ height: '100vh', overflowY: 'auto' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/savings-passport" className="flex items-center">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex items-center">
            <h1 className="text-lg font-bold text-gray-900">{businessName}</h1>
          </div>
          <div className="w-8" />
        </div>
        <div className="px-4 pb-3">
          <p className="text-sm text-gray-600">Prize: {reward}</p>
        </div>
      </div>

      {/* Loyalty Card */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Loyalty Card</h2>
            
            {/* Enhanced Loyalty Card Design - Matching Old App */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-xl p-6 border-2 border-dashed border-amber-300 shadow-lg relative overflow-hidden">
              {/* Coffee Bean Decorations */}
              <div className="absolute top-2 right-2 text-amber-200 text-2xl">☕</div>
              <div className="absolute bottom-2 left-2 text-amber-200 text-xl">☕</div>
              <div className="absolute top-4 left-4 text-amber-200 text-sm">☕</div>
              
              {/* Business Name */}
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-amber-900 mb-2">{businessName}</h3>
                <p className="text-amber-700 font-medium">Prize: {reward}</p>
              </div>
              
              {/* Stamp Collection Grid */}
              <div className="bg-white rounded-lg p-4 mb-4 shadow-inner">
                <div className="grid grid-cols-5 gap-3 mb-4">
                  {Array.from({ length: stampsRequired }, (_, index) => {
                    const isCollected = index < stampsCollected;
                    return (
                      <div
                        key={index}
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shadow-md transition-all duration-300 ${
                          isCollected
                            ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-amber-200'
                            : 'bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700 border-2 border-amber-300'
                        }`}
                      >
                        {isCollected ? (
                          <div className="text-xs font-bold">
                            {businessName.split(' ').map(word => word[0]).join('')}
                          </div>
                        ) : (
                          <div className="text-xs font-bold">{index + 1}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Progress Display */}
                <div className="text-center">
                  <p className="text-sm text-amber-800 font-medium mb-2">
                    {stampsCollected} / {stampsRequired} stamps collected
                  </p>
                  <div className="w-full bg-amber-200 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all duration-500 shadow-md"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Est. Date */}
              <div className="text-right">
                <span className="text-xs text-amber-600 font-medium">Est. 2024</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleScanForStamp}
              disabled={isCompleted}
              className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                isCompleted
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              {isScanning ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Scanning...
                </div>
              ) : (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Scan for Stamp
                </div>
              )}
            </button>

            <button
              onClick={handleRedeemPrize}
              disabled={!isCompleted}
              className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                isCompleted
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Gift className="w-4 h-4 mr-2" />
              Redeem Prize
            </button>
          </div>

          {/* Terms & Conditions */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Terms & Conditions</h4>
            <p className="text-sm text-gray-600">
              Collect {stampsRequired} stamps to get {reward.toLowerCase()}. One stamp per visit. Not valid with other offers.
            </p>
          </div>
        </div>
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
          <div className="flex flex-col items-center py-2 px-3 text-orange-600">
            <CreditCard className="w-5 h-5" />
            <span className="text-xs mt-1">Passport</span>
          </div>
          <Link to="/profile" className="flex flex-col items-center py-2 px-3 text-gray-600">
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyCardPage;
