import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { useAddons } from "./useAddons";
import { useAvailableAddons } from "./useAvailableAddons";
import { useSearchParams } from "next/navigation";
import { useUser } from "../../../contexts/UserContext";

export const useAddonsPage = () => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const icons = useSupabaseIcons();

  const planType = user?.plan?.toUpperCase();
  const isYearly =
    searchParams.get("isYearly") === "true" ||
    user?.billing_cycle?.toLowerCase() === "yearly";

  const {
    addons: rawAddons,
    isLoading: loading,
    error,
    refetch,
    isFetching,
  } = useAvailableAddons();

  const addonsHook = useAddons(planType);

  const addons = rawAddons.filter(
    (addon) =>
      !addonsHook.selectedAddons.some((selected) => selected.id === addon.id),
  );

  const handleContinue = () => {
    addonsHook.handleContinueToCheckout(addonsHook.selectedAddons);
  };

  return {
    backendPlan: null,
    planType,
    isYearly,
    addons,
    icons,
    loading,
    error,
    refetch,
    isFetching,

    ...addonsHook,

    handleContinue,
  };
};
