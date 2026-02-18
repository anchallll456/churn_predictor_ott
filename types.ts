export enum SubscriptionType {
  Basic = 'Basic',
  Standard = 'Standard',
  Premium = 'Premium'
}

export enum PaymentMethod {
  CreditCard = 'Credit Card',
  PayPal = 'PayPal',
  BankTransfer = 'Bank Transfer',
  DebitCard = 'Debit Card',
  Crypto = 'Crypto',
  GiftCard = 'Gift Card'
}

export interface CustomerData {
  id: string;
  age: number;
  gender: string; 
  country: string;
  subscriptionType: SubscriptionType;
  monthlyCost: number;
  watchTimeHrsPerWeek: number;
  favoriteGenre: string;
  devices: number;
  paymentMethod: PaymentMethod;
  tenureMonths: number;
  loginsPerWeek: number;
  supportCalls: number;
  lastLoginDaysAgo: number;
  discountUsed: boolean;
  engagementScore: number; // 0-100
  churned: number; // 0 or 1
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  auc: number;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
}

export interface PredictionResult {
  probability: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  factors: string[];
  recommendation: string;
}

export interface BusinessMetrics {
  totalUsers: number;
  churnRate: number;
  monthlyRevenue: number;
  revenueLoss: number;
  clv: number;
}
