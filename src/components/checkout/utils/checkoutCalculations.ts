import { Addon } from "@/shared/src/store/onboarding/types/addonTypes";

export const calculateAddonsTotal = (selectedAddons: Addon[]): number => {
  return selectedAddons.reduce((total, addon) => {
    return total + addon.price * (addon.used || 1);
  }, 0);
};

export const calculateTotalPrice = (
  displayPrice: number,
  selectedAddons: Addon[]
): number => {
  const addonsTotal = calculateAddonsTotal(selectedAddons);
  return displayPrice + addonsTotal;
};
