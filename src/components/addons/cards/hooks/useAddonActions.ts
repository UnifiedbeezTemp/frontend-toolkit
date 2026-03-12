import { useMemo } from "react";
import { Addon } from "../../../../store/onboarding/types/addonTypes";
import { useUser } from "../../../../contexts/UserContext";

interface UseAddonActionsProps {
  addon: Addon;
  variant: "add" | "manage";
}

export const useAddonActions = ({ addon, variant }: UseAddonActionsProps) => {
  const { user } = useUser();
  const isHighestPlan = useMemo(
    () => user?.plan?.toUpperCase() === "ORGANISATION",
    [user?.plan],
  );

  const canIncrease = useMemo(
    () => addon.limit === -1 || addon.limit > 0,
    [addon.limit],
  );

  const isCancelling = useMemo(
    () => (addon.scheduledForCancellation || 0) > 0,
    [addon.scheduledForCancellation],
  );

  const showUpgradeWarning = useMemo(
    () => variant === "manage" && !canIncrease && !isHighestPlan,
    [variant, canIncrease, isHighestPlan],
  );

  return {
    isHighestPlan,
    canIncrease,
    isCancelling,
    showUpgradeWarning,
  };
};
