// [2024-09-26] - API service for Consumer app - replaces shared dependencies
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://api.localplus.city';

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('auth_token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getCurrentUser() {
    return this.request('/api/auth/me');
  }

  async logout() {
    return this.request('/api/auth', {
      method: 'DELETE',
    });
  }

  // Restaurant endpoints
  async getRestaurants(filters: {
    location?: string;
    cuisine?: string;
    priceRange?: string;
    rating?: string;
    limit?: number;
    offset?: number;
  }) {
    const params = new URLSearchParams();
    
    if (filters.location) params.append('location', filters.location);
    if (filters.cuisine) params.append('cuisine', filters.cuisine);
    if (filters.priceRange) params.append('priceRange', filters.priceRange);
    if (filters.rating) params.append('rating', filters.rating);
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.offset) params.append('offset', filters.offset.toString());

    return this.request(`/api/restaurants?${params}`);
  }

  async getRestaurantById(id: string) {
    return this.request(`/api/restaurants/${id}`);
  }

  async searchRestaurants(query: string, location?: string, radius = 5000, limit = 20) {
    const params = new URLSearchParams({
      query,
      radius: radius.toString(),
      limit: limit.toString(),
    });
    
    if (location) {
      params.append('location', location);
    }

    return this.request(`/api/restaurants/search?${params}`);
  }

  async getNearbyRestaurants(lat: number, lng: number, radius = 5000, limit = 20) {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lng: lng.toString(),
      radius: radius.toString(),
      limit: limit.toString(),
    });

    return this.request(`/api/restaurants/nearby?${params}`);
  }

  // Booking endpoints
  async createBooking(bookingData: any) {
    return this.request('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getBookingById(id: string) {
    return this.request(`/api/bookings/${id}`);
  }
}

export const apiService = new ApiService();
