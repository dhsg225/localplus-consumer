import React from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          LocalPlus Consumer App
        </h1>
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">
            Welcome to the LocalPlus Consumer App!
          </p>
          <p className="text-gray-500">
            This is a simplified version that will actually build and deploy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
