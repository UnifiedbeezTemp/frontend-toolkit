export interface MultiLanguageInstance {
  id: number;
  language: string;
  scheduledForCancellation: boolean;
  expiresAt: string;
}

export interface PurchasedAddonResponse {
  type: string;
  name: string;
  quantity: number;
  active: number;
  scheduledForCancellation: number;
  priceEur: number;
  instances?: MultiLanguageInstance[];
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  priceText: string;
  limit: number;
  limitText: string;
  icon: string;
  addonType: string;
  used?: number; // Total quantity (active + scheduled for cancellation)
  active?: number; // Currently active quantity
  scheduledForCancellation?: number; // Quantity scheduled to cancel
  basePlanAllowance?: number;
  remainingPurchasable?: number;
  isIncludedInPlan?: boolean;
  instances?: MultiLanguageInstance[]; // For multi-language addons
  selectedLanguages?: string[]; // For UI selection state
}
