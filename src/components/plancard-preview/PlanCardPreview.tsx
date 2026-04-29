"use client";

import ImageComponent from "next/image";
import Link from "next/link";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import Button from "../ui/Button";
import { useCheckoutPlan } from "./hooks/useCheckoutPlan";
import Heading from "../ui/Heading";
import Text from "../ui/Text";
import { usePlan } from "../../api/services/plan/hooks/usePlan";
import PlanCardPreviewSkeleton from "./PlanCardPreviewSkeleton";
import { usePlanCardPreview } from "./hooks/usePlanCardPreview";
import { PlanCardPreviewProps } from "./types";
import PlanSelectionRequiredModal from "../plan-selection/modals/PlanSelectionRequiredModal";
import PlanPreviewModal from "./components/PlanPreviewModal";
import ComparisonModal from "../comparison-table/ComparisonModal";
import { AvailableAddonsPreviewModal } from "../plan-selection/modals/AvailableAddonsPreviewModal";
import { useUser } from "../../contexts/UserContext";
import { useBulkSeatStatsPreview } from "./hooks/useBulkSeatStatsPreview";
import PlanCardPreviewDisplay from "./components/PlanCardPreviewDisplay";

export default function PlanCardPreview({
  isAddons,
  selectedAddons,
  planType,
  isYearly = false,
  isOneSided = false,
  enableReturnTo = false,
  onSelectPlan,
}: PlanCardPreviewProps) {
  const { user } = useUser();
  const effectiveIsYearly =
    user?.planBillingInterval === "YEARLY" ? true : isYearly;

  const isOrganisation = planType?.toUpperCase() === "ORGANISATION";
  const { bulkSeatsCount, hasActiveBulkSeats, bulkSeatsMonthlyTotal } =
    useBulkSeatStatsPreview({
      enabled: isOrganisation && !isAddons,
    });

  const { plan: backendPlan, loading, error, retry } = usePlan({ planType });
  const { plan, monthlyPrice } = useCheckoutPlan({
    backendPlan,
    isYearly: effectiveIsYearly,
  });
  const icons = useSupabaseIcons();

  const {
    isMenuOpen,
    isModalOpen,
    setIsModalOpen,
    isAddonsModalOpen,
    setIsAddonsModalOpen,
    menuRef,
    handleAddonsClick,
    handleUpgradeClick,
    handleMenuToggle,
    handleSeeDetailsClick,
    handleComparePlansClick,
    handlePlanSelect,
    isComparisonModalOpen,
    setIsComparisonModalOpen,
    isPreviewAddonsModalOpen,
    setIsPreviewAddonsModalOpen,
    previewPlanType,
    addonsTotal,
    totalPrice,
    addonsToUse,
  } = usePlanCardPreview({
    plan,
    selectedAddons,
    monthlyPrice,
    isYearly: effectiveIsYearly,
    enableReturnTo,
    onSelectPlan,
    bulkSeatsMonthlyTotal,
  });

  if (loading) {
    return <PlanCardPreviewSkeleton />;
  }

  if (error) {
    return (
      <div className="border border-border p-[2rem] rounded-[1rem] mt-[2.3rem] layout-body shadow">
        <Heading className="text-red-600 mb-4">Failed to Load Plan</Heading>
        <Text className="text-text-secondary mb-4">
          We couldn't load your selected plan. Please try again.
        </Text>
        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={() => retry()}
            className="text-[1.3rem] font-[700]"
          >
            Retry
          </Button>
          <Link
            href="/plans"
            className="underline text-[1.4rem] text-brand-primary flex items-center gap-[1rem] hover:scale-98 transition-all"
          >
            Select a Different Plan
            <ImageComponent
              src={icons.linkExternal}
              alt=""
              width={15}
              height={15}
            />
          </Link>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="border border-border p-[2rem] rounded-[1rem] mt-[2.3rem] layout-body shadow">
        <Heading className="">No Plan Selected</Heading>
        <Text className="text-text-secondary mb-4">
          Please select a plan to continue with your checkout.
        </Text>
        <Link
          href="/plans"
          className="underline text-[1.4rem] text-brand-primary text-left flex items-center gap-[1rem] hover:scale-98 transition-all"
        >
          Select a Plan{" "}
          <ImageComponent
            src={icons.linkExternal}
            alt=""
            width={15}
            height={15}
          />
        </Link>
      </div>
    );
  }

  return (
    <>
      <PlanCardPreviewDisplay
        plan={plan}
        isAddons={isAddons}
        planType={planType}
        addonsTotal={addonsTotal}
        totalPrice={totalPrice}
        selectedAddons={addonsToUse}
        bulkSeatsCount={hasActiveBulkSeats ? bulkSeatsCount : 0}
        isYearly={effectiveIsYearly}
        isOneSided={isOneSided}
        isMenuOpen={isMenuOpen}
        menuRef={menuRef}
        onAddonsClick={() => handleAddonsClick(planType)}
        onComparePlansClick={handleComparePlansClick}
        onUpgradeClick={handleUpgradeClick}
        onMenuToggle={handleMenuToggle}
        onSeeDetailsClick={handleSeeDetailsClick}
      />

      <PlanPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={plan}
        isYearly={effectiveIsYearly}
        totalPrice={totalPrice}
        onAddonsClick={() => handleAddonsClick(planType)}
        onSelect={handleUpgradeClick}
      />

      <PlanSelectionRequiredModal
        isOpen={isAddonsModalOpen}
        onClose={() => setIsAddonsModalOpen(false)}
      />

      <ComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        onSelectPlan={handlePlanSelect}
        onAddonsClick={handleAddonsClick}
      />

      <AvailableAddonsPreviewModal
        isOpen={isPreviewAddonsModalOpen}
        onClose={() => setIsPreviewAddonsModalOpen(false)}
        planType={previewPlanType}
      />
    </>
  );
}
