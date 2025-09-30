import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import RestaurantsPage from './modules/restaurants/components/RestaurantsPage';
import ServicesPage from './modules/services/components/ServicesPage';
import EventsPage from './modules/events/components/EventsPage';
import NewsPage from './modules/news/components/NewsPage';
import { AuthProvider, useAuth } from './modules/auth/context/AuthContext';
import LoginForm from './modules/auth/components/LoginForm';
import SignupForm from './modules/auth/components/SignupForm';
import UserProfile from './modules/auth/components/UserProfile';
import AuthGuard from './modules/auth/components/AuthGuard';
import { Home, Search, MessageCircle, CreditCard, User, MapPin, Clock, Star, Calendar, Wrench, Newspaper, Gift, Award, Settings, RefreshCw } from 'lucide-react';

// Mobile-first PWA Home Screen
const MobileHomeScreen: React.FC = () => {
  const { authState } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
      {/* Header Section */}
      <div className="bg-white px-4 pt-4 pb-2">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome to LocalPlus</h1>
          <p className="text-sm text-gray-600 mb-3">Your lifestyle companion for Thailand</p>
          
          {/* Location Selector */}
          <div className="flex items-center justify-center mb-2">
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <MapPin className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-sm font-medium">Bangkok</span>
              <span className="text-xs text-gray-500 ml-1">▼</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 flex items-center justify-center">
            <MapPin className="w-3 h-3 text-red-500 mr-1" />
            Auto-detected: Bangkok
          </p>
        </div>
      </div>

      {/* Promotional Cards */}
      <div className="px-4 py-4 space-y-3">
        {/* Off Peak Dining Card */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="w-6 h-6 mr-3" />
              <div>
                <h3 className="font-bold text-lg">Off Peak Dining</h3>
                <p className="text-sm opacity-90">Save up to 50% during off-peak hours</p>
              </div>
            </div>
            <div className="bg-yellow-400 text-black px-3 py-1 rounded-lg text-xs font-bold text-center">
              UP TO<br/>50% OFF
            </div>
          </div>
        </div>

        {/* Savings Passport Card */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="w-6 h-6 mr-3" />
              <div>
                <h3 className="font-bold text-lg">Savings Passport</h3>
                <p className="text-sm opacity-90">Instant savings at 500+ businesses</p>
              </div>
            </div>
            <div className="bg-yellow-400 text-black px-3 py-1 rounded-lg text-xs font-bold text-center">
              ฿199<br/>MONTH
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {/* Row 1 */}
          <Link to="/restaurants" className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-3">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Restaurants</h3>
              <p className="text-xs text-gray-600 mt-1">Find great places to eat</p>
            </div>
          </Link>

          <Link to="/events" className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Events</h3>
              <p className="text-xs text-gray-600 mt-1">Discover local events</p>
            </div>
          </Link>

          {/* Row 2 */}
          <Link to="/services" className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Services</h3>
              <p className="text-xs text-gray-600 mt-1">Local service providers</p>
            </div>
          </Link>

          <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-3">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">AI Assistant</h3>
              <p className="text-xs text-gray-600 mt-1">Ask about anything local</p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl p-4 hover:shadow-md transition-shadow relative">
            <div className="absolute top-2 right-2">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">NEW</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-3">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Savings Passport</h3>
              <p className="text-xs text-gray-600 mt-1">Instant savings at 500+ businesses</p>
            </div>
          </div>

          <Link to="/deals" className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Today's Deals</h3>
              <p className="text-xs text-gray-600 mt-1">Limited time offers</p>
            </div>
          </Link>

          {/* Row 4 */}
          <Link to="/news" className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow relative">
            <div className="absolute top-2 right-2">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">NEW</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center mb-3">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Local News</h3>
              <p className="text-xs text-gray-600 mt-1">Stay updated with local happenings</p>
            </div>
          </Link>

          <Link to="/loyalty" className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-3">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">My Loyalty Cards</h3>
              <p className="text-xs text-gray-600 mt-1">Track your rewards & progress</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-2">
          <Link to="/" className="flex flex-col items-center py-2 px-3 text-red-600">
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
          <div className="flex flex-col items-center py-2 px-3 text-gray-600">
            <CreditCard className="w-5 h-5" />
            <span className="text-xs mt-1">Passport</span>
          </div>
          {authState.isAuthenticated ? (
            <Link to="/profile" className="flex flex-col items-center py-2 px-3 text-gray-600">
              <User className="w-5 h-5" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          ) : (
            <Link to="/auth/login" className="flex flex-col items-center py-2 px-3 text-gray-600">
              <User className="w-5 h-5" />
              <span className="text-xs mt-1">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// Auth pages component
const AuthPages: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-sm">
        {authMode === 'login' ? (
          <LoginForm 
            onSuccess={() => navigate('/profile')}
            onSwitchToSignup={() => setAuthMode('signup')}
          />
        ) : (
          <SignupForm 
            onSuccess={() => navigate('/profile')}
            onSwitchToLogin={() => setAuthMode('login')}
          />
        )}
      </div>
    </div>
  );
};

// Main app content with auth integration
const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
      <Routes>
        <Route path="/" element={<MobileHomeScreen />}/>
        <Route path="/restaurants" element={<RestaurantsPage />}/>
        <Route path="/services" element={<ServicesPage />}/>
        <Route path="/events" element={<EventsPage />}/>
        <Route path="/news" element={<NewsPage />}/>
        <Route path="/auth/login" element={<AuthPages />} />
        <Route path="/auth/signup" element={<AuthPages />} />
        <Route path="/profile" element={
          <AuthGuard requireAuth={true}>
            <UserProfile />
          </AuthGuard>
        }/>
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
