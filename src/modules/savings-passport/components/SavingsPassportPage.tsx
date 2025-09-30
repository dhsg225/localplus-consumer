import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Clock, MapPin, Star, TrendingUp, Award, Gift, Calendar, CheckCircle, Zap, Users, DollarSign } from 'lucide-react';
import { SavingsPassport, DiscountOffer, LoyaltyCard, TimeBasedDiscount, SavingsPassportStats } from '../types';

const SavingsPassportPage: React.FC = () => {
  const [savingsPassport, setSavingsPassport] = useState<SavingsPassport | null>(null);
  const [discountOffers, setDiscountOffers] = useState<DiscountOffer[]>([]);
  const [loyaltyCards, setLoyaltyCards] = useState<LoyaltyCard[]>([]);
  const [timeBasedDiscounts, setTimeBasedDiscounts] = useState<TimeBasedDiscount[]>([]);
  const [stats, setStats] = useState<SavingsPassportStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'offers' | 'loyalty' | 'time-based'>('offers');

  useEffect(() => {
    loadSavingsPassportData();
  }, []);

  const loadSavingsPassportData = async () => {
    try {
      setLoading(true);
      console.log('💳 Loading Savings Passport data...');

      // Mock data based on original codebase
      const mockSavingsPassport: SavingsPassport = {
        id: '1',
        userId: 'user-1',
        subscriptionTier: 'premium',
        subscriptionExpiresAt: '2024-12-31T23:59:59Z',
        totalSavings: 2450.50,
        redemptionCount: 12,
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: new Date().toISOString()
      };

      const mockDiscountOffers: DiscountOffer[] = [
        {
          id: '1',
          businessId: '1',
          businessName: 'Seaside Bistro',
          title: 'Fresh Seafood Special',
          description: '20% off all seafood dishes and appetizers',
          discountPercentage: 20,
          termsConditions: 'Valid for Savings Passport members only. Cannot be combined with other offers.',
          validFrom: '2024-01-01',
          validUntil: '2024-12-31',
          maxRedemptionsPerUser: 1,
          currentRedemptions: 45,
          isActive: true,
          businessImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
          businessAddress: '123 Ocean Drive, Hua Hin',
          businessRating: 4.6
        },
        {
          id: '2',
          businessId: '2',
          businessName: 'Blue Wave Spa',
          title: 'Relaxation Package',
          description: '25% off traditional Thai massage treatments',
          discountPercentage: 25,
          termsConditions: 'Valid for Savings Passport members only. Cannot be combined with other offers.',
          validFrom: '2024-01-01',
          validUntil: '2024-12-31',
          maxRedemptionsPerUser: 1,
          currentRedemptions: 23,
          isActive: true,
          businessImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400',
          businessAddress: '456 Wellness Street, Hua Hin',
          businessRating: 4.8
        }
      ];

      const mockLoyaltyCards: LoyaltyCard[] = [
        {
          id: '1',
          businessId: '1',
          businessName: 'Seaside Bistro',
          programName: 'Ocean Club',
          stampsRequired: 10,
          stampsCollected: 7,
          isCompleted: false,
          rewardDescription: 'Free dessert after 10 visits',
          businessImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400'
        },
        {
          id: '2',
          businessId: '2',
          businessName: 'Blue Wave Spa',
          programName: 'Wellness Circle',
          stampsRequired: 5,
          stampsCollected: 5,
          isCompleted: true,
          completedAt: '2024-01-15T10:30:00Z',
          rewardDescription: 'Free 30-minute massage',
          businessImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400'
        }
      ];

      const mockTimeBasedDiscounts: TimeBasedDiscount[] = [
        {
          id: '1',
          businessId: '1',
          businessName: 'Seaside Bistro',
          dealType: 'early-bird',
          title: 'Early Bird Special',
          description: '30% off breakfast and brunch items',
          discountPercentage: 30,
          timeRange: { start: 7, end: 11 },
          isActive: true,
          isPopular: true,
          businessImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
          businessAddress: '123 Ocean Drive, Hua Hin',
          businessRating: 4.6
        },
        {
          id: '2',
          businessId: '2',
          businessName: 'Blue Wave Spa',
          dealType: 'afternoon',
          title: 'Afternoon Relaxation',
          description: '20% off afternoon spa treatments',
          discountPercentage: 20,
          timeRange: { start: 14, end: 17 },
          isActive: true,
          isPopular: false,
          businessImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400',
          businessAddress: '456 Wellness Street, Hua Hin',
          businessRating: 4.8
        }
      ];

      const mockStats: SavingsPassportStats = {
        totalSavings: 2450.50,
        redemptionCount: 12,
        activeOffers: 8,
        completedLoyaltyCards: 3,
        monthlySavings: 450.75,
        favoriteBusinesses: ['Seaside Bistro', 'Blue Wave Spa', 'Golden Palace Thai']
      };

      setSavingsPassport(mockSavingsPassport);
      setDiscountOffers(mockDiscountOffers);
      setLoyaltyCards(mockLoyaltyCards);
      setTimeBasedDiscounts(mockTimeBasedDiscounts);
      setStats(mockStats);

    } catch (error) {
      console.error('💳 Error loading Savings Passport data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentTimeStatus = (dealType: string) => {
    const currentTime = new Date();
    const thailandTime = new Date(currentTime.toLocaleString("en-US", {timeZone: "Asia/Bangkok"}));
    const currentHour = thailandTime.getHours();

    const timeRanges = {
      'early-bird': { start: 7, end: 11 },
      'afternoon': { start: 14, end: 17 },
      'late-night': { start: 21, end: 24 }
    };

    const range = timeRanges[dealType as keyof typeof timeRanges];
    if (!range) return { status: 'inactive', message: 'Not available' };

    if (currentHour >= range.start && currentHour < range.end) {
      return { status: 'active', message: 'Available now' };
    } else if (currentHour < range.start) {
      const hoursUntil = range.start - currentHour;
      return { status: 'upcoming', message: `Starts in ${hoursUntil}h` };
    } else {
      const hoursUntil = 24 - currentHour + range.start;
      return { status: 'upcoming', message: `Starts in ${hoursUntil}h` };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center max-w-md mx-auto">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Savings Passport...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-w-md mx-auto relative">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex items-center">
            <CreditCard className="w-5 h-5 text-orange-500 mr-2" />
            <h1 className="text-lg font-bold text-gray-900">Savings Passport</h1>
          </div>
          <div className="w-5"></div>
        </div>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="px-4 py-4">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-bold">Your Savings</h2>
                <p className="text-sm opacity-90">Total saved this year</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">฿{stats.totalSavings.toLocaleString()}</div>
                <div className="text-xs opacity-90">{stats.redemptionCount} redemptions</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold">{stats.activeOffers}</div>
                <div className="text-xs opacity-90">Active Offers</div>
              </div>
              <div>
                <div className="text-lg font-bold">{stats.completedLoyaltyCards}</div>
                <div className="text-xs opacity-90">Completed Cards</div>
              </div>
              <div>
                <div className="text-lg font-bold">฿{stats.monthlySavings}</div>
                <div className="text-xs opacity-90">This Month</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="px-4 pb-4">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('offers')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'offers'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Discount Offers
          </button>
          <button
            onClick={() => setActiveTab('loyalty')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'loyalty'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Loyalty Cards
          </button>
          <button
            onClick={() => setActiveTab('time-based')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'time-based'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Time-Based
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-4">
        {activeTab === 'offers' && (
          <div className="space-y-4">
            {discountOffers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {offer.businessImage && (
                  <img
                    src={offer.businessImage}
                    alt={offer.businessName}
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{offer.title}</h3>
                      <p className="text-sm text-gray-600">{offer.businessName}</p>
                    </div>
                    <div className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-bold">
                      {offer.discountPercentage}% OFF
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{offer.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{offer.businessAddress}</span>
                    </div>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Use Offer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'loyalty' && (
          <div className="space-y-4">
            {loyaltyCards.map((card) => (
              <div key={card.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{card.programName}</h3>
                      <p className="text-sm text-gray-600">{card.businessName}</p>
                    </div>
                    {card.isCompleted ? (
                      <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-bold">
                        <CheckCircle className="w-3 h-3 inline mr-1" />
                        Completed
                      </div>
                    ) : (
                      <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-bold">
                        {card.stampsCollected}/{card.stampsRequired}
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{card.stampsCollected}/{card.stampsRequired} stamps</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(card.stampsCollected / card.stampsRequired) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{card.rewardDescription}</p>
                  
                  <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg text-sm font-medium">
                    {card.isCompleted ? 'Claim Reward' : 'View Progress'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'time-based' && (
          <div className="space-y-4">
            {timeBasedDiscounts.map((discount) => {
              const timeStatus = getCurrentTimeStatus(discount.dealType);
              return (
                <div key={discount.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {discount.businessImage && (
                    <img
                      src={discount.businessImage}
                      alt={discount.businessName}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{discount.title}</h3>
                        <p className="text-sm text-gray-600">{discount.businessName}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                        timeStatus.status === 'active'
                          ? 'bg-green-100 text-green-600'
                          : timeStatus.status === 'upcoming'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {timeStatus.message}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{discount.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{discount.timeRange.start}:00 - {discount.timeRange.end}:00</span>
                      </div>
                      <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        timeStatus.status === 'active'
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {timeStatus.status === 'active' ? 'Use Now' : 'Not Available'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavingsPassportPage;
