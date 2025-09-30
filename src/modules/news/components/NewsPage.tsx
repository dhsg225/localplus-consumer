import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, RefreshCw, Newspaper, Clock, User, Tag } from 'lucide-react';
import { NewsArticle, NewsCategory } from '../types';

const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock news data for now - in production this would connect to WordPress API
      const mockArticles: NewsArticle[] = [
        {
          id: '1',
          title: 'New Thai Restaurant Opens in Bangkok',
          content: 'A new authentic Thai restaurant has opened in the heart of Bangkok, offering traditional dishes and modern interpretations...',
          excerpt: 'A new authentic Thai restaurant has opened in the heart of Bangkok...',
          author: 'LocalPlus News',
          publishedAt: '2025-01-30T10:00:00Z',
          imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
          category: 'Food & Dining',
          tags: ['restaurant', 'thai', 'bangkok'],
          url: 'https://localplus.city/news/new-thai-restaurant-opens'
        },
        {
          id: '2',
          title: 'Hua Hin Beach Festival 2025',
          content: 'The annual Hua Hin Beach Festival returns with live music, food vendors, and family activities...',
          excerpt: 'The annual Hua Hin Beach Festival returns with live music...',
          author: 'LocalPlus News',
          publishedAt: '2025-01-29T14:30:00Z',
          imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
          category: 'Events',
          tags: ['festival', 'hua-hin', 'beach'],
          url: 'https://localplus.city/news/hua-hin-beach-festival-2025'
        },
        {
          id: '3',
          title: 'Local Business Spotlight: Seaside Grill',
          content: 'This week we feature Seaside Grill, a family-owned restaurant serving fresh seafood for over 20 years...',
          excerpt: 'This week we feature Seaside Grill, a family-owned restaurant...',
          author: 'LocalPlus News',
          publishedAt: '2025-01-28T09:15:00Z',
          imageUrl: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400',
          category: 'Business',
          tags: ['business', 'seafood', 'restaurant'],
          url: 'https://localplus.city/news/seaside-grill-spotlight'
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setArticles(mockArticles);
    } catch (error) {
      console.error('Failed to load news:', error);
      setError('Failed to load news articles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'Food & Dining', 'Events', 'Business', 'Community'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-w-md mx-auto">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex items-center">
            <Newspaper className="w-5 h-5 text-gray-600 mr-2" />
            <h1 className="text-lg font-bold text-gray-900">Local News</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={loadNews} className="p-2 text-gray-600 hover:text-gray-900">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Location */}
        <div className="px-4 pb-3">
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Bangkok
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="px-4 pb-3">
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  selectedCategory === category 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Articles */}
      <div className="px-4 py-4">
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-8">
            <Newspaper className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No news articles found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Article Image */}
                {article.imageUrl && (
                  <div className="h-48 bg-gray-200">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Article Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{article.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <User className="w-3 h-3 mr-1" />
                      <span>{article.author}</span>
                    </div>
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-500 text-sm font-medium hover:text-orange-600"
                    >
                      Read More →
                    </a>
                  </div>

                  {/* Tags */}
                  {article.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {article.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
