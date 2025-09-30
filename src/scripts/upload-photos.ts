const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://joknprahhqdhvdhzmuwl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impva25wcmFoaHFkaHZkaHptdXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NTI3MTAsImV4cCI6MjA2NTIyODcxMH0.YYkEkYFWgd_4-OtgG47xj6b5MX_fu7zNQxrW9ymR8Xk';

const supabase = createClient(supabaseUrl, supabaseKey);

// Strategy for manually uploading photos
async function uploadRestaurantPhotos() {
  // Example: Upload photos for specific restaurants
  const restaurantPhotos = {
    'Gingerfire Restaurant': [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop'
    ],
    'Mae Keb Khanomthai': [
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop'
    ]
  };

  for (const [restaurantName, photos] of Object.entries(restaurantPhotos)) {
    try {
      // Update the restaurant with new photos
      const { error } = await supabase
        .from('businesses')
        .update({ photo_gallery: photos })
        .eq('name', restaurantName);

      if (error) {
        console.error(`Error updating ${restaurantName}:`, error);
      } else {
        console.log(`✅ Updated photos for ${restaurantName}`);
      }
    } catch (err) {
      console.error(`Failed to update ${restaurantName}:`, err);
    }
  }
}

// Strategy for downloading and re-uploading photos
// async function downloadAndUploadPhotos() {
//   // This would require a server-side implementation
//   // You could use Node.js with libraries like 'axios' and 'form-data'
//   console.log('This would require server-side implementation');
// }

// Manual photo URLs strategy
const manualPhotoUrls = {
  'Gingerfire Restaurant': [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=600&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop&auto=format&q=80'
  ]
};

// Main execution
async function main() {
  console.log('🖼️ Starting photo upload process...');
  await uploadRestaurantPhotos();
  console.log('✅ Photo upload process completed!');
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { uploadRestaurantPhotos, manualPhotoUrls };
