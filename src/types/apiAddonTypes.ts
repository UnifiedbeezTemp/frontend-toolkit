export interface ApiAddon {
  id: number;
  type: string;
  name: string;
  description: string;
  priceEur: number;
  billingType: string;
  isActive: boolean;
  maxQuantity: number | null;
  createdAt: string;
  updatedAt: string;
}
