export interface ApiAddon {
  id: number;
  type: string;
  name: string;
  description: string;
  priceEur: number;
  billingType: string;
  billingInterval?: string; // "MONTHLY" | "YEARLY"
  isActive: boolean;
  maxQuantity: number | null;
  category?: string; // "USAGE_PACK" | etc.
  createdAt: string;
  updatedAt: string;
}
