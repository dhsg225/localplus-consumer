// [2024-12-19] - Authentication context for LocalPlus consumer app
// Provides global authentication state management and auth methods

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { 
  AuthState, 
  User, 
  LoginCredentials, 
  SignupCredentials, 
  ProfileUpdate, 
  ChangePassword, 
  PasswordReset, 
  AuthContextType,
  AuthMethod,
  MOCK_USER
} from '../types';

// Initial auth state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Auth action types
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_CLEAR_ERROR' }
  | { type: 'AUTH_UPDATE_USER'; payload: User };

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    case 'AUTH_CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'AUTH_UPDATE_USER':
      return {
        ...state,
        user: action.payload,
        error: null
      };
    default:
      return state;
  }
};

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would check for stored tokens
        const storedUser = localStorage.getItem('localplus_user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          dispatch({ type: 'AUTH_SUCCESS', payload: user });
        } else {
          dispatch({ type: 'AUTH_FAILURE', payload: 'No stored authentication' });
        }
      } catch (error) {
        dispatch({ type: 'AUTH_FAILURE', payload: 'Authentication check failed' });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, this would call your auth API
      if (credentials.email === 'demo@localplus.com' && credentials.password === 'password') {
        const user = { ...MOCK_USER, email: credentials.email };
        localStorage.setItem('localplus_user', JSON.stringify(user));
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error instanceof Error ? error.message : 'Login failed' });
      throw error;
    }
  };

  // Signup function
  const signup = async (credentials: SignupCredentials): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user creation
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: credentials.email,
        name: credentials.name,
        phone: credentials.phone,
        dateOfBirth: credentials.dateOfBirth,
        preferences: {
          favoriteCategories: [],
          favoriteRestaurants: [],
          favoriteEvents: [],
          favoriteServices: [],
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
        createdAt: new Date(),
        updatedAt: new Date(),
        isVerified: false,
        isPremium: false
      };
      
      localStorage.setItem('localplus_user', JSON.stringify(newUser));
      dispatch({ type: 'AUTH_SUCCESS', payload: newUser });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error instanceof Error ? error.message : 'Signup failed' });
      throw error;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      localStorage.removeItem('localplus_user');
      dispatch({ type: 'AUTH_LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Update profile function
  const updateProfile = async (updates: ProfileUpdate): Promise<void> => {
    if (!authState.user) throw new Error('Not authenticated');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...authState.user,
        ...updates,
        updatedAt: new Date()
      };
      
      localStorage.setItem('localplus_user', JSON.stringify(updatedUser));
      dispatch({ type: 'AUTH_UPDATE_USER', payload: updatedUser });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error instanceof Error ? error.message : 'Profile update failed' });
      throw error;
    }
  };

  // Change password function
  const changePassword = async (passwords: ChangePassword): Promise<void> => {
    if (!authState.user) throw new Error('Not authenticated');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would validate current password and update it
      console.log('Password changed successfully');
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error instanceof Error ? error.message : 'Password change failed' });
      throw error;
    }
  };

  // Request password reset
  const requestPasswordReset = async (email: string): Promise<void> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Password reset email sent to:', email);
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error instanceof Error ? error.message : 'Password reset request failed' });
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (resetData: PasswordReset): Promise<void> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Password reset successfully');
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error instanceof Error ? error.message : 'Password reset failed' });
      throw error;
    }
  };

  // Social login
  const socialLogin = async (method: AuthMethod): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate social auth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const socialUser = {
        ...MOCK_USER,
        email: `user@${method}.com`,
        name: `${method.charAt(0).toUpperCase() + method.slice(1)} User`
      };
      
      localStorage.setItem('localplus_user', JSON.stringify(socialUser));
      dispatch({ type: 'AUTH_SUCCESS', payload: socialUser });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error instanceof Error ? error.message : 'Social login failed' });
      throw error;
    }
  };

  // Refresh token
  const refreshToken = async (): Promise<void> => {
    try {
      // In a real app, this would refresh the authentication token
      console.log('Token refreshed');
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: 'Token refresh failed' });
      throw error;
    }
  };

  // Clear error
  const clearError = (): void => {
    dispatch({ type: 'AUTH_CLEAR_ERROR' });
  };

  const contextValue: AuthContextType = {
    authState,
    login,
    signup,
    logout,
    updateProfile,
    changePassword,
    requestPasswordReset,
    resetPassword,
    socialLogin,
    refreshToken,
    clearError
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
