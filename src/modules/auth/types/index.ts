// [2024-12-19] - Authentication module types for LocalPlus consumer app
// Defines TypeScript interfaces for user authentication, profiles, and auth state

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: Date;
  preferences: UserPreferences;
  location?: UserLocation;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  isPremium: boolean;
}

export interface UserPreferences {
  favoriteCategories: string[];
  favoriteRestaurants: string[];
  favoriteEvents: string[];
  favoriteServices: string[];
  notifications: NotificationSettings;
  language: string;
  timezone: string;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  eventReminders: boolean;
  restaurantDeals: boolean;
  serviceUpdates: boolean;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  country: string;
  postalCode?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  dateOfBirth?: Date;
  acceptTerms: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ProfileUpdate {
  name?: string;
  phone?: string;
  dateOfBirth?: Date;
  avatar?: string;
  location?: UserLocation;
  preferences?: Partial<UserPreferences>;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Authentication methods
export type AuthMethod = 'email' | 'google' | 'facebook' | 'apple';

export interface SocialAuthConfig {
  google: {
    clientId: string;
    redirectUri: string;
  };
  facebook: {
    appId: string;
    redirectUri: string;
  };
  apple: {
    clientId: string;
    redirectUri: string;
  };
}

// User roles and permissions
export type UserRole = 'user' | 'premium' | 'business' | 'admin';

export interface UserPermissions {
  canCreateEvents: boolean;
  canManageBusiness: boolean;
  canAccessAnalytics: boolean;
  canModerateContent: boolean;
}

// Authentication context type
export interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: ProfileUpdate) => Promise<void>;
  changePassword: (passwords: ChangePassword) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (resetData: PasswordReset) => Promise<void>;
  socialLogin: (method: AuthMethod) => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState {
  isValid: boolean;
  errors: ValidationError[];
  isSubmitting: boolean;
}

// Mock user data for development
export const MOCK_USER: User = {
  id: 'user-123',
  email: 'john.doe@example.com',
  name: 'John Doe',
  avatar: '/images/avatars/john-doe.jpg',
  phone: '+66 32 123 456',
  dateOfBirth: new Date('1990-05-15'),
  preferences: {
    favoriteCategories: ['restaurants', 'events', 'wellness'],
    favoriteRestaurants: ['restaurant-1', 'restaurant-2'],
    favoriteEvents: ['event-1', 'event-2'],
    favoriteServices: ['service-1', 'service-2'],
    notifications: {
      email: true,
      push: true,
      sms: false,
      eventReminders: true,
      restaurantDeals: true,
      serviceUpdates: false
    },
    language: 'en',
    timezone: 'Asia/Bangkok'
  },
  location: {
    latitude: 12.5683,
    longitude: 99.9576,
    address: 'Hua Hin, Thailand',
    city: 'Hua Hin',
    country: 'Thailand',
    postalCode: '77110'
  },
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-12-19'),
  isVerified: true,
  isPremium: false
};
