export interface Addon {
  id: string;
  name: string;
  price: number;
  priceText: string;
  limit: number;
  limitText: string;
  icon: string;
  addonType: string;
  used?: number;
}