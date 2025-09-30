import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import RestaurantsPage from './modules/restaurants/components/RestaurantsPage';
import ServicesPage from './modules/services/components/ServicesPage';
import EventsPage from './modules/events/components/EventsPage';
import { AuthProvider, useAuth } from './modules/auth/context/AuthContext';
import LoginForm from './modules/auth/components/LoginForm';
import SignupForm from './modules/auth/components/SignupForm';
import UserProfile from './modules/auth/components/UserProfile';
import AuthGuard from './modules/auth/components/AuthGuard';

// Auth pages component
const AuthPages: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
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
  const { authState } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-900">
                LocalPlus
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/restaurants" className="text-gray-600 hover:text-gray-900">Restaurants</Link>
              <Link to="/services" className="text-gray-600 hover:text-gray-900">Services</Link>
              <Link to="/events" className="text-gray-600 hover:text-gray-900">Events</Link>
              {authState.isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Welcome, {authState.user?.name}</span>
                  <Link to="/profile" className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                    Profile
                  </Link>
                </div>
              ) : (
                <Link to="/auth/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">
                LocalPlus Consumer App
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Welcome to the LocalPlus Consumer App!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <Link to="/restaurants" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-2xl mb-2">🍽️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Restaurants</h3>
                  <p className="text-gray-600">Discover local dining and food experiences</p>
                </Link>
                <Link to="/services" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-2xl mb-2">🔧</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Services</h3>
                  <p className="text-gray-600">Find local services and professionals</p>
                </Link>
                <Link to="/events" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-2xl mb-2">🎉</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Events</h3>
                  <p className="text-gray-600">Explore local events and activities</p>
                </Link>
              </div>
            </div>
          }/>
          <Route path="/restaurants" element={<RestaurantsPage />}/>
          <Route path="/services" element={<ServicesPage />}/>
          <Route path="/events" element={<EventsPage />}/>
          <Route path="/auth/login" element={<AuthPages />} />
          <Route path="/auth/signup" element={<AuthPages />} />
          <Route path="/profile" element={
            <AuthGuard requireAuth={true}>
              <UserProfile />
            </AuthGuard>
          }/>
        </Routes>
      </div>
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
