export const UNIT_CONVERSION_FACTOR = 100;
export const YEARLY_DISCOUNT_FACTOR = 0.85;

export const formatPriceFromCents = (cents: number) => {
  return cents / UNIT_CONVERSION_FACTOR;
};

export const formatPriceRaw = (price: number) => {
  return price;
};

export const calculateBillingCyclePrice = (
  monthlyPrice: number,
  isYearly: boolean
) => {
  if (!isYearly) return monthlyPrice;
  return Math.floor(monthlyPrice * 12 * YEARLY_DISCOUNT_FACTOR);
};

export const calculateTotalWithAddons = (
  planMonthlyPrice: number,
  addonsMonthlyTotal: number,
  isYearly: boolean
) => {
  if (!isYearly) {
    return planMonthlyPrice + addonsMonthlyTotal;
  }

  const annualPlanPrice = calculateBillingCyclePrice(planMonthlyPrice, true);
  const annualAddonsPrice = addonsMonthlyTotal * 12;

  return annualPlanPrice + annualAddonsPrice;
};
