import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RestaurantsPage from './modules/restaurants/components/RestaurantsPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">
                LocalPlus Consumer App
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Welcome to the LocalPlus Consumer App!
              </p>
              <a href="/restaurants" className="text-blue-600 hover:text-blue-800 underline">
                View Restaurants →
              </a>
            </div>
          }/>
          <Route path="/restaurants" element={<RestaurantsPage />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
