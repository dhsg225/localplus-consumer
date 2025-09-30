// Savings Passport types based on original codebase
export interface SavingsPassport {
  id: string;
  userId: string;
  subscriptionTier: 'free' | 'premium';
  subscriptionExpiresAt?: string;
  totalSavings: number;
  redemptionCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DiscountOffer {
  id: string;
  businessId: string;
  businessName: string;
  title: string;
  description: string;
  discountPercentage: number;
  termsConditions: string;
  validFrom: string;
  validUntil: string;
  maxRedemptionsPerUser: number;
  totalRedemptionLimit?: number;
  currentRedemptions: number;
  isActive: boolean;
  businessImage?: string;
  businessAddress?: string;
  businessRating?: number;
}

export interface UserRedemption {
  id: string;
  userId: string;
  businessId: string;
  discountOfferId: string;
  redemptionCode: string;
  amountSaved: number;
  verificationStatus: 'pending' | 'verified' | 'disputed';
  redeemedAt: string;
  verifiedAt?: string;
}

export interface LoyaltyCard {
  id: string;
  businessId: string;
  businessName: string;
  programName: string;
  stampsRequired: number;
  stampsCollected: number;
  isCompleted: boolean;
  completedAt?: string;
  lastStampAt?: string;
  rewardDescription: string;
  businessImage?: string;
}

export interface TimeBasedDiscount {
  id: string;
  businessId: string;
  businessName: string;
  dealType: 'early-bird' | 'afternoon' | 'late-night' | 'off-peak';
  title: string;
  description: string;
  discountPercentage: number;
  timeRange: {
    start: number; // hour (0-23)
    end: number;   // hour (0-23)
  };
  isActive: boolean;
  isPopular: boolean;
  businessImage?: string;
  businessAddress?: string;
  businessRating?: number;
}

export interface SavingsPassportStats {
  totalSavings: number;
  redemptionCount: number;
  activeOffers: number;
  completedLoyaltyCards: number;
  monthlySavings: number;
  favoriteBusinesses: string[];
}
