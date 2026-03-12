import { api, useAppQuery } from "../../../api";
import {
  Addon,
  PurchasedAddonResponse,
} from "../../../store/onboarding/types/addonTypes";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "../../../contexts/UserContext";
import { ApiAddon } from "../../../types/apiAddonTypes";
import { getAddonUiMetadata } from "../../../data/addonsData";
import { useAvailableAddons } from "../../addons/hooks/useAvailableAddons";

interface PurchasedAddonsResponse {
  addons: PurchasedAddonResponse[];
}

const transformPurchasedAddonToAddon = (
  purchasedAddon: PurchasedAddonResponse,
  icons: ReturnType<typeof useSupabaseIcons>,
  availableAddon?: ApiAddon,
  isYearly?: boolean,
): Addon => {
  // Use raw metadata from available addon if present
  const remainingPurchasable = availableAddon?.remainingPurchasable ?? null;
  const isIncludedInPlan =
    availableAddon?.isIncludedInPlan ??
    purchasedAddon.isIncludedInPlan ??
    false;

  const { uiId, icon, limitText } = getAddonUiMetadata(
    purchasedAddon.type,
    remainingPurchasable,
    icons,
  );

  const monthlyPrice = purchasedAddon.priceEur / 100;
  const displayPrice = isYearly ? monthlyPrice * 12 : monthlyPrice;
  const priceSuffix = isYearly ? "/year" : "/month";

  return {
    id: purchasedAddon.id ? String(purchasedAddon.id) : uiId,
    name: purchasedAddon.name,
    price: monthlyPrice,
    priceText: `Price: £${displayPrice}${priceSuffix}`,
    limit: remainingPurchasable ?? -1,
    limitText: limitText,
    icon: icon,
    addonType: purchasedAddon.type,
    billingType: purchasedAddon.billingInterval || purchasedAddon.billingType,
    used: purchasedAddon.quantity,
    active: purchasedAddon.active,
    scheduledForCancellation: purchasedAddon.scheduledForCancellation,
    isIncludedInPlan: isIncludedInPlan,
    instances: purchasedAddon.instances?.map((instance) => ({
      id: instance.id,
      language: instance.language,
      scheduledForCancellation: instance.scheduledForCancellation,
      expiresAt: instance.expiresAt,
    })),
  };
};

export const usePurchasedAddons = () => {
  const icons = useSupabaseIcons();
  const { user } = useUser();
  const searchParams = useSearchParams();
  const isYearly =
    searchParams.get("isYearly") === "true" ||
    user?.planBillingInterval === "YEARLY";

  // Fetch available addons to enrich purchased data with accurate limits
  const { rawApiAddons, isLoading: isLoadingAvailable } = useAvailableAddons();

  const { data, isLoading, error, refetch, isFetching } =
    useAppQuery<PurchasedAddonsResponse>(
      ["purchasedAddons"],
      () => api.get("/addon/purchased"),
      {
        enabled: true,
      },
    );

  const purchasedAddons: Addon[] = useMemo(() => {
    if (!data?.addons) return [];

    return data.addons.map((purchased) => {
      // Find the corresponding available addon to get the correct limit metadata
      const availableMatch = rawApiAddons.find(
        (avail) => avail.type === purchased.type,
      );

      return transformPurchasedAddonToAddon(
        purchased,
        icons,
        availableMatch,
        isYearly,
      );
    });
  }, [data, icons, isYearly, rawApiAddons]);

  return {
    purchasedAddons,
    isLoading: isLoading || isLoadingAvailable,
    error,
    refetch,
    isFetching,
  };
};
