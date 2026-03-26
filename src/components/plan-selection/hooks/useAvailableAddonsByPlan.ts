import { useState, useEffect, useCallback } from "react";
import { addonService } from "../../../api/services/addon/addonService";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { transformApiAddonsToUiAddons } from "../../../data/addonsData";
import { Addon } from "../../../store/onboarding/types/addonTypes";
import { useToast } from "../../ui/toast/ToastProvider";

export const useAvailableAddonsByPlan = (planType: string | null) => {
  const [addons, setAddons] = useState<Addon[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const icons = useSupabaseIcons();
  const { showToast } = useToast();

  const fetchAddons = useCallback(async () => {
    if (!planType) return;

    setLoading(true);
    setHasError(false);
    try {
      const response = await addonService.getAvailableAddonsByPlan(planType);
      const transformed = transformApiAddonsToUiAddons(
        response.addons || [],
        icons,
      );
      setAddons(transformed);
    } catch {
      setHasError(true);
      showToast({
        title: "Error",
        description: "Failed to fetch available addons for this plan.",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [planType, icons, showToast]);

  useEffect(() => {
    fetchAddons();
  }, [fetchAddons]);

  return { addons, loading, hasError, refetch: fetchAddons };
};
