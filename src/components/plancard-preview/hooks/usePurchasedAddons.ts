import { api, useAppQuery } from "../../../api";
import { Addon } from "../../../store/onboarding/types/addonTypes";

interface PurchasedAddon {
  id: number;
  userId: number;
  addonDefinitionId: number;
  quantity: number;
  isActive: boolean;
  stripeProductId: string | null;
  stripePriceId: string;
  purchasedAt: string;
  expiresAt: string;
  addonDefinition: {
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
  };
}

interface PurchasedAddonsResponse {
  addons: PurchasedAddon[];
}

const transformPurchasedAddonToAddon = (
  purchasedAddon: PurchasedAddon
): Addon => {
  return {
    id: purchasedAddon.addonDefinitionId.toString(),
    name: purchasedAddon.addonDefinition.name,
    price: purchasedAddon.addonDefinition.priceEur / 100,
    priceText: `€${(purchasedAddon.addonDefinition.priceEur / 100).toFixed(2)}`,
    limit: purchasedAddon.addonDefinition.maxQuantity || 0,
    limitText: purchasedAddon.addonDefinition.description,
    icon: "",
    addonType: purchasedAddon.addonDefinition.type,
    used: purchasedAddon.quantity,
  };
};

export const usePurchasedAddons = () => {
  const { data, isLoading, error, refetch, isFetching } =
    useAppQuery<PurchasedAddonsResponse>(
      ["purchasedAddons"],
      () => api.get("/addon/purchased"),
      {
        enabled: true,
      }
    );

  const purchasedAddons: Addon[] = data?.addons
    ? data.addons.map(transformPurchasedAddonToAddon)
    : [];

  return {
    purchasedAddons,
    isLoading,
    error,
    refetch,
    isFetching,
  };
};
