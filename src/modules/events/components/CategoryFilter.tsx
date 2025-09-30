// [2024-12-19] - Category filter component for events
// Allows users to filter events by category with visual indicators

import React from 'react';
import { EventCategory } from '../types';

interface CategoryFilterProps {
  categories: EventCategory[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3 justify-center">
        {/* All Categories Option */}
        <button
          onClick={() => onCategorySelect('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Events
        </button>

        {/* Category Options */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center ${
              selectedCategory === category.id
                ? 'text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            style={{
              backgroundColor: selectedCategory === category.id ? category.color : 'transparent',
              border: selectedCategory === category.id ? 'none' : `2px solid ${category.color}20`
            }}
          >
            <div 
              className="w-4 h-4 rounded-full mr-2 flex items-center justify-center"
              style={{ backgroundColor: selectedCategory === category.id ? 'white' : category.color }}
            >
              <span 
                className="text-xs font-bold"
                style={{ color: selectedCategory === category.id ? category.color : 'white' }}
              >
                {category.name.charAt(0)}
              </span>
            </div>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
