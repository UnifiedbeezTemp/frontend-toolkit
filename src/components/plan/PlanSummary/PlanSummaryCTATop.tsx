import { useEffect, useRef, useState } from "react";
import { getPlansData } from "../../../data/plansData";
import { useToggle } from "../../../hooks/useToggle";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import PlanCardPreviewDisplay from "../../plancard-preview/components/PlanCardPreviewDisplay";
import PlanPreviewModal from "../../plancard-preview/components/PlanPreviewModal";
import { useBulkSeatStatsPreview } from "../../plancard-preview/hooks/useBulkSeatStatsPreview";
import { usePlanPreviewPricing } from "../../plancard-preview/hooks/usePlanPreviewPricing";
import { PlanSummaryCardProps } from "../types";
import PlanSummarySkeleton from "./PlanSummarySkeleton";

import { useUser } from "../../../contexts/UserContext";

export default function PlanSummaryCTATop({
  plan,
  className,
  isLoading,
  isUpgradePlanDisabled,
  purchasedAddons,
  onAddonsClick = () => { },
  onSelect = () => { },
}: PlanSummaryCardProps) {
  const icons = useSupabaseIcons();
  const { user } = useUser();
  const {
    value: showDetails,
    setFalse: handleClose,
    setTrue: handleOpen,
  } = useToggle();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isYearly = user?.planBillingInterval === "YEARLY";
  const previewPlan = getPlansData([plan], icons)[0];
  const isOrganisation = plan.planType?.toUpperCase() === "ORGANISATION";
  const { bulkSeatsCount, hasActiveBulkSeats, bulkSeatsMonthlyTotal } =
    useBulkSeatStatsPreview({
      enabled: isOrganisation,
    });
  const { addonsTotal, totalPrice } = usePlanPreviewPricing({
    plan: previewPlan,
    addons: purchasedAddons,
    monthlyPrice: plan.priceEur,
    isYearly,
    bulkSeatsMonthlyTotal,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  if (isLoading) return <PlanSummarySkeleton />;
  return (
    <>
      <PlanPreviewModal
        isOpen={showDetails}
        onClose={handleClose}
        plan={previewPlan}
        isYearly={isYearly}
        totalPrice={totalPrice}
        onAddonsClick={onAddonsClick}
        onSelect={onSelect}
      />
      <PlanCardPreviewDisplay
        className={className}
        plan={previewPlan}
        isAddons={false}
        planType={plan.planType}
        addonsTotal={addonsTotal}
        totalPrice={totalPrice}
        selectedAddons={purchasedAddons}
        bulkSeatsCount={hasActiveBulkSeats ? bulkSeatsCount : 0}
        isYearly={isYearly}
        isOneSided
        isMenuOpen={isMenuOpen}
        menuRef={menuRef}
        onAddonsClick={onAddonsClick}
        onComparePlansClick={(event) => {
          event?.preventDefault();
          onSelect();
        }}
        onUpgradeClick={onSelect}
        onMenuToggle={() => setIsMenuOpen((value) => !value)}
        onSeeDetailsClick={() => {
          setIsMenuOpen(false);
          handleOpen();
        }}
        actionLabel="Change Plan"
        isActionDisabled={isUpgradePlanDisabled}
      />
    </>
  );
}
