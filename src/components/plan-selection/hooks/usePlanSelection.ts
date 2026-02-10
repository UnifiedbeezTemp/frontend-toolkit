import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../../../components/ui/toast/useToast";
import { usePlans } from "../../../api/services/plan/hooks/usePlans";
import { accountSetupService } from "../../../api/services/auth/accountSetupService";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useUser } from "../../../contexts/UserContext";

export const usePlanSelection = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const { user, refetch } = useUser();
  const { showToast } = useToast();
  const { plans: backendPlans, loading, error, retry } = usePlans();

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

    setIsSelecting(true);

    try {
      if (user?.trialInfo) {
        try {
          const previewResponse =
            await accountSetupService.switchPreview(selectedPlan);
          console.log("Switch Preview Response:", previewResponse);
        } catch (error) {
          console.error("Failed to fetch switch preview:", error);
        }
      }

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
    } finally {
      setIsSelecting(false);
    }
  };

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
  };
};
