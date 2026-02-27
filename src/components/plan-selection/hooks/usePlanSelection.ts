import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../../../components/ui/toast/useToast";
import { usePlans } from "../../../api/services/plan/hooks/usePlans";
import { accountSetupService } from "../../../api/services/auth/accountSetupService";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useUser } from "../../../contexts/UserContext";
import { useSwitchPreview } from "../../downgrade-warning/hooks/useSwitchPreview";
import { authService } from "../../../api/services/auth";
import { PaymentMethodData } from "../../../api/services/auth/types";

export const usePlanSelection = () => {
  const router = useRouter();
  const { user, refetch } = useUser();
  const [isYearly, setIsYearly] = useState(
    user?.planBillingInterval === "YEARLY",
  );

  useEffect(() => {
    if (user?.planBillingInterval) {
      setIsYearly(user.planBillingInterval === "YEARLY");
    }
  }, [user?.planBillingInterval]);

  // Fetch payment method if not in user profile
  useEffect(() => {
    const fetchPaymentMethod = async () => {
      if (user?.paymentMethod) {
        setLocalPaymentMethod(user.paymentMethod);
        return;
      }

      setIsFetchingPaymentMethod(true);
      try {
        const response = await authService.getPaymentMethod();
        if (response?.success && response?.data) {
          setLocalPaymentMethod(response.data);
        }
      } catch (err) {
        return;
      } finally {
        setIsFetchingPaymentMethod(false);
      }
    };

    fetchPaymentMethod();
  }, [user?.paymentMethod]);

  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showDowngradeWarning, setShowDowngradeWarning] = useState(false);
  const [showPaymentConfirmationModal, setShowPaymentConfirmationModal] =
    useState(false);
  const [isProceedingDowngrade, setIsProceedingDowngrade] = useState(false);
  const [pendingOnSuccess, setPendingOnSuccess] = useState<
    ((isNewUpgrade: boolean) => void) | undefined
  >(undefined);
  const [localPaymentMethod, setLocalPaymentMethod] =
    useState<PaymentMethodData | null>(null);
  const [isFetchingPaymentMethod, setIsFetchingPaymentMethod] = useState(false);
  const [showUpdatePaymentModal, setShowUpdatePaymentModal] = useState(false);

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

      setIsSelecting(true);
      try {
        const currentPaymentMethod = user?.paymentMethod || localPaymentMethod;
        const billingInterval = isYearly ? "YEARLY" : "MONTHLY";

        if (currentPaymentMethod) {
          // USER HAS CARD: Use switch endpoint
          const response = await authService.switchPlan(
            selectedPlan,
            billingInterval,
          );

          showToast({
            title: "Plan Changed",
            description: response.message,
            variant: "success",
          });

          // Redirect back for existing users
          router.back();
        } else {
          // USER HAS NO CARD: Use trial activation (redirects to checkout)
          await accountSetupService.selectPlan(selectedPlan, billingInterval);

          const hasPlanChanged =
            user?.plan?.toLowerCase() !== selectedPlan.toLowerCase() ||
            user?.planBillingInterval !== (isYearly ? "YEARLY" : "MONTHLY");

          if (hasPlanChanged) {
            setShowCelebrationModal(true);
          } else if (onSuccess) {
            // Only call onSuccess if no celebration is shown (to avoid premature redirect)
            onSuccess(hasPlanChanged);
          }
        }

        refetch();
        // Close confirmation modal ONLY on success
        setShowPaymentConfirmationModal(false);
      } catch (err) {
        const errorMessage = extractErrorMessage(err, "Failed to select plan");

        // Handle specific yearly downgrade error
        if (errorMessage.includes("YEARLY_DOWNGRADE_NOT_ALLOWED")) {
          showToast({
            title: "Cannot Downgrade",
            description:
              "You cannot switch to monthly billing while on a yearly plan.",
            variant: "error",
          });
        } else {
          showToast({
            title: "Selection failed",
            description: errorMessage,
            variant: "error",
          });
        }
      } finally {
        setIsSelecting(false);
      }
    },
    [
      selectedPlan,
      isYearly,
      refetch,
      user?.plan,
      user?.planBillingInterval,
      showToast,
      router,
      localPaymentMethod,
      user?.paymentMethod,
    ],
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

    const targetBillingInterval = isYearly ? "YEARLY" : "MONTHLY";

    // If no plan change AND no billing interval change, just trigger success
    if (
      currentPlanId === targetPlanId &&
      user?.planBillingInterval === targetBillingInterval
    ) {
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
          // If the plan is the same but we are upgrading from Monthly to Yearly, skip downgrade warning
          const isIntervalUpgrade =
            currentPlanId === targetPlanId &&
            user?.planBillingInterval === "MONTHLY" &&
            targetBillingInterval === "YEARLY";

          if (!isIntervalUpgrade) {
            setPendingOnSuccess(() => onSuccess);
            setShowDowngradeWarning(true);
            setIsSelecting(false);
            return;
          }
        }
      }

      // Proceed with plan change for non-trial users or upgrades
      const currentPaymentMethod = user?.paymentMethod || localPaymentMethod;

      if (currentPaymentMethod) {
        console.log(
          "[usePlanSelection] Card found, showing confirmation modal",
        );
        setShowPaymentConfirmationModal(true);
      } else {
        console.log(
          "[usePlanSelection] No card found. Triggering trial endpoint.",
        );
        // No payment method, trigger trial activation FIRST
        await executePlanChange(onSuccess);
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

  const handleDowngradeProceed = useCallback(async () => {
    // Before proceeding with trial change (downgrade), check if user has a card
    const currentPaymentMethod = user?.paymentMethod || localPaymentMethod;

    if (currentPaymentMethod) {
      // User has a card, so we MUST confirm via the PaymentConfirmationModal
      setShowDowngradeWarning(false);
      setShowPaymentConfirmationModal(true);
      // We keep pendingOnSuccess so executePlanChange knows what to call after confirmation
      return;
    }

    // No card found, proceed with direct trial change
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
  }, [
    executePlanChange,
    pendingOnSuccess,
    resetSwitchPreview,
    showToast,
    user?.paymentMethod,
    localPaymentMethod,
  ]);

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
    showPaymentConfirmationModal,
    setShowPaymentConfirmationModal,
    executePlanChange,
    showUpdatePaymentModal,
    setShowUpdatePaymentModal,
    paymentMethod: user?.paymentMethod || localPaymentMethod,
    isFetchingPaymentMethod,
  };
};
