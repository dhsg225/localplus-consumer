import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Clock, MapPin, Star, TrendingUp, Award, Gift, Calendar, CheckCircle, Zap, Users, DollarSign, Crown, Trophy, Target, Bookmark, Home, Search, MessageCircle, User } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  icon: string;
  rarity: 'common' | 'epic' | 'rare' | 'legendary';
  earnedAt: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: string;
  isCompleted: boolean;
}

const SavingsPassportPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'challenges' | 'saved'>('overview');
  const [selectedDistance, setSelectedDistance] = useState<'1km' | '3km' | '5km' | '10km'>('3km');
  const [currentLocation, setCurrentLocation] = useState('Hua Hin (-33.4141, 151.4630)');

  // Mock data matching the original screenshots
  const userData = {
    name: 'Siriporn Tanaka',
    membershipTier: 'SILVER MEMBER',
    stampsCollected: 47,
    stampsToGold: 200,
    premiumActive: true,
    expiresAt: 'Dec 2024'
  };

  const stats = {
    badgesEarned: 8,
    totalSaved: 2450,
    bookingsMade: 23,
    weekStreak: 4
  };

  const recentBadges: Badge[] = [
    { id: '1', name: 'Fusion Fanatic', icon: '🎨', rarity: 'common', earnedAt: '2024-01-15' },
    { id: '2', name: 'Weekend Warrior', icon: '⚔️', rarity: 'epic', earnedAt: '2024-01-14' },
    { id: '3', name: 'Early Bird Champion', icon: '🌅', rarity: 'rare', earnedAt: '2024-01-13' },
    { id: '4', name: 'First Steps', icon: '👶', rarity: 'common', earnedAt: '2024-01-12' },
    { id: '5', name: 'Premium Explorer', icon: '💎', rarity: 'rare', earnedAt: '2024-01-11' },
    { id: '6', name: 'Songkran Foodie 2024', icon: '💧', rarity: 'legendary', earnedAt: '2024-01-10' }
  ];

  const challenges: Challenge[] = [
    { id: '1', title: 'Dining Explorer', description: 'Visit 10 different restaurants', progress: 7, target: 10, reward: '฿100 credit', isCompleted: false },
    { id: '2', title: 'Early Bird', description: 'Book 5 morning dining experiences', progress: 3, target: 5, reward: 'Free coffee', isCompleted: false },
    { id: '3', title: 'Loyalty Master', description: 'Complete 3 loyalty cards', progress: 2, target: 3, reward: 'Premium badge', isCompleted: false }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center max-w-md mx-auto">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Passport...</p>
        </div>
      </div>
    );
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-700';
      case 'epic': return 'bg-purple-100 text-purple-700';
      case 'rare': return 'bg-blue-100 text-blue-700';
      case 'legendary': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-gray-50 pb-20 max-w-md mx-auto relative hide-scrollbar" style={{ height: '100vh', overflowY: 'auto' }}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex items-center">
            <Trophy className="w-5 h-5 text-orange-500 mr-2" />
            <h1 className="text-lg font-bold text-gray-900">LocalPlus Passport</h1>
          </div>
          <div className="w-5"></div>
        </div>
        <p className="text-center text-sm text-gray-600 pb-3">Your dining journey across Bangkok</p>
      </div>

      {/* Tab Navigation */}
      <div className="px-4 py-3 bg-white border-b">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center ${
              activeTab === 'overview'
                ? 'bg-red-100 text-red-600 border-b-2 border-red-600'
                : 'text-gray-600'
            }`}
          >
            <Trophy className="w-4 h-4 mr-1" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center ${
              activeTab === 'badges'
                ? 'bg-red-100 text-red-600 border-b-2 border-red-600'
                : 'text-gray-600'
            }`}
          >
            <Award className="w-4 h-4 mr-1" />
            Badges
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center ${
              activeTab === 'challenges'
                ? 'bg-red-100 text-red-600 border-b-2 border-red-600'
                : 'text-gray-600'
            }`}
          >
            <Target className="w-4 h-4 mr-1" />
            Challenges
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center ${
              activeTab === 'saved'
                ? 'bg-red-100 text-red-600 border-b-2 border-red-600'
                : 'text-gray-600'
            }`}
          >
            <Bookmark className="w-4 h-4 mr-1" />
            Saved
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-4">
        {activeTab === 'overview' && (
          <>
            {/* User Membership Card */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-4 text-white">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <div className="flex items-center mt-1">
                    <Crown className="w-4 h-4 mr-1" />
                    <span className="text-sm">{userData.membershipTier}</span>
                  </div>
                </div>
                <div className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                  PREMIUM ACTIVE
                </div>
              </div>
              <p className="text-sm opacity-90 mb-3">Unlimited discounts • Expires {userData.expiresAt}</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{userData.stampsCollected}</div>
                  <div className="text-xs opacity-90">stamps</div>
                </div>
                <div className="flex-1 ml-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress to gold</span>
                    <span>{userData.stampsCollected}/{userData.stampsToGold}</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(userData.stampsCollected / userData.stampsToGold) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Instant Discounts */}
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-3">Today's Instant Discounts Near Me</h3>
              <div className="flex items-center mb-3">
                <MapPin className="w-4 h-4 text-red-500 mr-1" />
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold">
                  0 WITHIN {selectedDistance.toUpperCase()}
                </span>
              </div>
              
              <div className="mb-3">
                <label className="text-sm text-gray-600 mb-2 block">Distance from me:</label>
                <div className="flex space-x-2">
                  {['1km', '3km', '5km', '10km'].map((distance) => (
                    <button
                      key={distance}
                      onClick={() => setSelectedDistance(distance as any)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedDistance === distance
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {distance}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center text-sm text-blue-600 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>Location: {currentLocation}</span>
              </div>

              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">No businesses found within {selectedDistance}</p>
                <p className="text-sm text-gray-500">Try increasing the distance range</p>
              </div>
            </div>

            {/* How it works */}
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <h4 className="font-bold text-blue-900 mb-2">How it works:</h4>
              <p className="text-sm text-blue-800">
                Each business offers one discount per calendar year. Simply scan the QR code at checkout to redeem your savings. Location detected using GPS.
              </p>
            </div>

            {/* Loyalty Cards Section */}
            <div className="bg-white rounded-xl p-4">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-orange-500" />
                My Loyalty Cards
              </h4>
              
              <div className="space-y-3">
                {/* Cafe Aroma Card */}
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold text-sm mr-3">C</div>
                      <div>
                        <h5 className="font-semibold text-gray-900">Cafe Aroma Card</h5>
                        <p className="text-sm text-gray-600">3 / 10 stamps</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '30%'}}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Prize: Free Coffee</span>
                    <Link to="/loyalty-card/cafe-aroma" className="bg-green-500 text-white px-3 py-1 rounded text-sm">View</Link>
                  </div>
                </div>

                {/* Blue Wave Spa Card */}
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-sm mr-3">B</div>
                      <div>
                        <h5 className="font-semibold text-gray-900">Blue Wave Spa Card</h5>
                        <p className="text-sm text-gray-600">7 / 8 stamps</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '87.5%'}}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Prize: Free Massage</span>
                    <Link to="/loyalty-card/blue-wave-spa" className="bg-blue-500 text-white px-3 py-1 rounded text-sm">View</Link>
                  </div>
                </div>

                {/* Golden Palace Thai Card */}
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white font-bold text-sm mr-3">G</div>
                      <div>
                        <h5 className="font-semibold text-gray-900">Golden Palace Thai Card</h5>
                        <p className="text-sm text-gray-600">12 / 12 stamps</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Prize: Free Dessert</span>
                    <Link to="/loyalty-card/golden-palace-thai" className="bg-purple-500 text-white px-3 py-1 rounded text-sm">View</Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'badges' && (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 text-center">
                <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stats.badgesEarned}</div>
                <div className="text-sm text-gray-600">Badges Earned</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">฿{stats.totalSaved.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Saved</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stats.bookingsMade}</div>
                <div className="text-sm text-gray-600">Bookings Made</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stats.weekStreak}</div>
                <div className="text-sm text-gray-600">Week Streak</div>
              </div>
            </div>

            {/* Recent Badges */}
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-4">Recent Badges</h3>
              <div className="grid grid-cols-3 gap-3">
                {recentBadges.map((badge) => (
                  <div key={badge.id} className="text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">{badge.icon}</span>
                    </div>
                    <div className="text-xs font-medium text-gray-900 mb-1">{badge.name}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${getRarityColor(badge.rarity)}`}>
                      {badge.rarity}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-red-500 text-sm font-medium flex items-center justify-center">
                View All Badges
                <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
              </button>
            </div>
          </>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="bg-white rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{challenge.title}</h3>
                    <p className="text-sm text-gray-600">{challenge.description}</p>
                  </div>
                  <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-bold">
                    {challenge.progress}/{challenge.target}
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{challenge.progress}/{challenge.target}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Reward: {challenge.reward}</span>
                  <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    challenge.isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-orange-500 text-white'
                  }`}>
                    {challenge.isCompleted ? 'Completed' : 'Continue'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="space-y-4">
            {/* Saved Deals Header */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Saved Deals</h3>
              <p className="text-sm text-gray-600">Your saved restaurant offers and discounts</p>
            </div>

            {/* Saved Deal Cards */}
            <div className="space-y-4">
              {/* The Spice Merchant Deal */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Deal Header with Prominent Percentage */}
                <div className="p-4 bg-gradient-to-r from-red-500 to-orange-500 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl font-bold">55%</div>
                      <div>
                        <div className="text-sm opacity-90">OFF</div>
                        <div className="text-xs opacity-75">🌅 Early Bird</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-yellow-400 text-yellow-900 px-2 py-1 text-xs font-medium rounded-full mb-1 block">
                        🔥 Top Deal
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Restaurant Info */}
                <div className="p-4">
                  <div className="flex items-start space-x-4">
                    <img 
                      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=80&h=80&fit=crop&crop=center&auto=format&q=80" 
                      alt="The Spice Merchant"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">The Spice Merchant</h4>
                      <p className="text-sm text-gray-600 mb-2">Perfect for a relaxed afternoon dining experience</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Saved 303 days ago</span>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span className="text-orange-600">Expires 12/31/2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="px-4 pb-4">
                  <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors">
                    Use Deal
                  </button>
                </div>
              </div>

              {/* Ocean Breeze Deal */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl font-bold">40%</div>
                      <div>
                        <div className="text-sm opacity-90">OFF</div>
                        <div className="text-xs opacity-75">☀️ Afternoon</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 text-xs font-medium rounded-full">
                        Used 299 days ago
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start space-x-4">
                    <img 
                      src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=80&h=80&fit=crop&crop=center&auto=format&q=80" 
                      alt="Ocean Breeze"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Ocean Breeze</h4>
                      <p className="text-sm text-gray-600 mb-2">Start your day with fresh seafood</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Saved 306 days ago</span>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span className="text-gray-500">Used 299 days ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Golden Spoon Deal */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl font-bold">60%</div>
                      <div>
                        <div className="text-sm opacity-90">OFF</div>
                        <div className="text-xs opacity-75">🌙 Late Night</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start space-x-4">
                    <img 
                      src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=80&h=80&fit=crop&crop=center&auto=format&q=80" 
                      alt="Golden Spoon"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Golden Spoon</h4>
                      <p className="text-sm text-gray-600 mb-2">Premium late night dining experience</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Saved 294 days ago</span>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span className="text-orange-600">Expires 1/15/2025</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors">
                    Use Deal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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

export default SavingsPassportPage;