import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../../../components/ui/toast/useToast";
import { usePlans } from "../../../api/services/plan/hooks/usePlans";
import { accountSetupService } from "../../../api/services/auth/accountSetupService";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useUser } from "../../../contexts/UserContext";
import { useSwitchPreview } from "../../downgrade-warning/hooks/useSwitchPreview";

export const usePlanSelection = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showDowngradeWarning, setShowDowngradeWarning] = useState(false);
  const [isProceedingDowngrade, setIsProceedingDowngrade] = useState(false);
  const [pendingOnSuccess, setPendingOnSuccess] = useState<
    ((isNewUpgrade: boolean) => void) | undefined
  >(undefined);

  const { user, refetch } = useUser();
  const { showToast } = useToast();
  const { plans: backendPlans, loading, error, retry } = usePlans();
  const {
    data: switchPreviewData,
    loading: switchPreviewLoading,
    fetchPreview,
    reset: resetSwitchPreview,
  } = useSwitchPreview();

  const executePlanChange = useCallback(
    async (onSuccess?: (isNewUpgrade: boolean) => void) => {
      if (!selectedPlan) return;

      try {
        await accountSetupService.selectPlan(selectedPlan);
        refetch();

        const hasPlanChanged =
          user?.plan?.toLowerCase() !== selectedPlan.toLowerCase();

        if (hasPlanChanged) {
          setShowCelebrationModal(true);
        }

        if (onSuccess) {
          onSuccess(hasPlanChanged);
        }
      } catch (err) {
        const errorMessage = extractErrorMessage(err, "Failed to select plan");
        showToast({
          title: "Selection failed",
          description: errorMessage,
          variant: "error",
        });
      }
    },
    [selectedPlan, refetch, user?.plan, showToast],
  );

  const handleContinue = async (
    onSuccess?: (isNewUpgrade: boolean) => void,
  ) => {
    if (!selectedPlan) {
      showToast({
        title: "No plan selected",
        description: "Please select a plan to continue",
        variant: "error",
      });
      return;
    }

    const currentPlanId = user?.plan?.toLowerCase();
    const targetPlanId = selectedPlan.toLowerCase();

    // If no plan change, just trigger success (which handles redirection)
    if (currentPlanId === targetPlanId) {
      if (onSuccess) onSuccess(false);
      return;
    }

    setIsSelecting(true);

    try {
      // Only check for downgrade warning if user is on a trial
      if (user?.trialInfo) {
        const previewResponse = await fetchPreview(selectedPlan);

        // Only show warning if it's strictly NOT an upgrade (i.e., a downgrade)
        if (previewResponse && !previewResponse.isUpgrade) {
          setPendingOnSuccess(() => onSuccess);
          setShowDowngradeWarning(true);
          setIsSelecting(false);
          return;
        }
      }

      // Proceed with plan change for non-trial users or upgrades
      await executePlanChange(onSuccess);
    } catch (err) {
      const errorMessage = extractErrorMessage(err, "Failed to select plan");
      showToast({
        title: "Selection failed",
        description: errorMessage,
        variant: "error",
      });
    } finally {
      setIsSelecting(false);
    }
  };

  const handleDowngradeProceed = useCallback(async () => {
    setIsProceedingDowngrade(true);

    try {
      await executePlanChange(pendingOnSuccess);
      setShowDowngradeWarning(false);
      resetSwitchPreview();
      setPendingOnSuccess(undefined);
    } catch (err) {
      const errorMessage = extractErrorMessage(err, "Failed to change plan");
      showToast({
        title: "Plan change failed",
        description: errorMessage,
        variant: "error",
      });
    } finally {
      setIsProceedingDowngrade(false);
    }
  }, [executePlanChange, pendingOnSuccess, resetSwitchPreview, showToast]);

  const handleCloseDowngradeWarning = useCallback(() => {
    setShowDowngradeWarning(false);
    resetSwitchPreview();
    setPendingOnSuccess(undefined);
  }, [resetSwitchPreview]);

  const handleCloseCelebration = () => {
    setShowCelebrationModal(false);
  };

  return {
    isYearly,
    setIsYearly,
    showCelebrationModal,
    setShowCelebrationModal,
    selectedPlan,
    setSelectedPlan,
    isSelecting,
    user,
    backendPlans,
    loading,
    error,
    retry,
    handleContinue,
    handleCloseCelebration,
    showDowngradeWarning,
    switchPreviewData,
    switchPreviewLoading,
    isProceedingDowngrade,
    handleDowngradeProceed,
    handleCloseDowngradeWarning,
  };
};
