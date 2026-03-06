export interface MultiLanguageInstance {
  id: number;
  language: string;
  scheduledForCancellation: boolean;
  expiresAt: string;
}

export interface PurchasedAddonResponse {
  id?: number | string;
  type: string;
  name: string;
  quantity: number;
  active: number;
  scheduledForCancellation: number;
  priceEur: number;
  billingType?: string;
  billingInterval?: string; // "MONTHLY" | "YEARLY"
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
  billingType?: string; // "MONTHLY" | "YEARLY"
  used?: number; // Total quantity (active + scheduled for cancellation)
  active?: number; // Currently active quantity
  scheduledForCancellation?: number; // Quantity scheduled to cancel
  basePlanAllowance?: number;
  remainingPurchasable?: number;
  isIncludedInPlan?: boolean;
  instances?: MultiLanguageInstance[]; // For multi-language addons
  selectedLanguages?: string[]; // For UI selection state
}
