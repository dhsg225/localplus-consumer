import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: (string | null)[];
  restaurantName: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, restaurantName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter out null images
  const validImages = images.filter(img => img !== null) as string[];
  
  // Debug logging for image carousel
  if (restaurantName === 'Gingerfire Restaurant') {
    console.log('🔍 ImageCarousel - Debugging Gingerfire:');
    console.log('- Received images:', images);
    console.log('- Images type:', typeof images);
    console.log('- Images length:', images?.length || 0);
    console.log('- Valid images after filter:', validImages);
    console.log('- Valid images length:', validImages.length);
  }

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (validImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === validImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [validImages.length]);

  const goToPrevious = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? validImages.length - 1 : currentImageIndex - 1);
  };

  const goToNext = () => {
    setCurrentImageIndex(currentImageIndex === validImages.length - 1 ? 0 : currentImageIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!validImages || validImages.length === 0) {
    if (restaurantName === 'Gingerfire Restaurant') {
      console.log('🔍 ImageCarousel - No valid images found for Gingerfire');
    }
    return (
      <div className="relative h-48 bg-gray-200 flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <div className="text-4xl mb-2">🍽️</div>
          <div className="text-sm">No images available</div>
        </div>
      </div>
    );
  }

  if (restaurantName === 'Gingerfire Restaurant') {
    console.log('🔍 ImageCarousel - Rendering images for Gingerfire:');
    console.log('- Current image index:', currentImageIndex);
    console.log('- Current image URL:', validImages[currentImageIndex]);
  }

  return (
    <div className="relative h-48 bg-gray-200 overflow-hidden">
      {/* Main Image */}
      <img
        src={validImages[currentImageIndex]}
        alt={`${restaurantName} - Image ${currentImageIndex + 1}`}
        className="w-full h-full object-cover transition-opacity duration-300"
        onLoad={() => {
          if (restaurantName === 'Gingerfire Restaurant') {
            console.log('🔍 ImageCarousel - Image loaded successfully for Gingerfire');
          }
        }}
        onError={(e) => {
          if (restaurantName === 'Gingerfire Restaurant') {
            console.log('🔍 ImageCarousel - Image failed to load for Gingerfire:', e);
            console.log('🔍 Failed image URL:', validImages[currentImageIndex]);
          }
        }}
      />

      {/* Photo Count Badge */}
      <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
        {validImages.length} photos
      </div>

      {/* Navigation Arrows */}
      {validImages.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs hover:bg-opacity-70 transition-all"
          >
            ← Swipe
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs hover:bg-opacity-70 transition-all"
          >
            Swipe →
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {validImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
