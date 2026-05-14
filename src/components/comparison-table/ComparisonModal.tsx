"use client";

import { useMemo, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import CloseModalButton from "../modal/CloseModalButton";
import Modal from "../modal/Modal";
import { OriginalPlan } from "../plan/types";
import PlanSelectionToggle from "../plan-selection/tabs/PlanSelectionToggle";
import ComparisonTable from "./ComparisonTable";

interface ComparisonModalProps {
  isOpen: boolean;
  allowBillingCycleToggle?: boolean;
  onClose: () => void;
  onSelectPlan?: (planId: string) => void;
  onAddonsClick?: (planId?: string) => void;
  currentUserPlan?: OriginalPlan;
}

export default function ComparisonModal({
  isOpen,
  onClose,
  onSelectPlan,
  onAddonsClick,
  allowBillingCycleToggle = true,
  currentUserPlan,
}: ComparisonModalProps) {
  const { user } = useUser();
  const defaultIsYearly = useMemo(() => {
    if (user?.planBillingInterval === "YEARLY") return true;
    if (user?.billing_cycle?.toLowerCase() === "yearly") return true;
    return false;
  }, [user?.billing_cycle, user?.planBillingInterval]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="fullscreen"
      className="w-[calc(100vw-2rem)] lg:w-fit rounded-[2.5rem] mx-auto overflow-hidden"
    >
      {isOpen && (
        <ComparisonModalContent
          key={String(defaultIsYearly)}
          allowBillingCycleToggle={allowBillingCycleToggle}
          currentUserPlan={currentUserPlan}
          defaultIsYearly={defaultIsYearly}
          onAddonsClick={onAddonsClick}
          onClose={onClose}
          onSelectPlan={onSelectPlan}
        />
      )}
    </Modal>
  );
}

interface ComparisonModalContentProps {
  allowBillingCycleToggle: boolean;
  currentUserPlan?: OriginalPlan;
  defaultIsYearly: boolean;
  onAddonsClick?: (planId?: string) => void;
  onClose: () => void;
  onSelectPlan?: (planId: string) => void;
}

function ComparisonModalContent({
  allowBillingCycleToggle,
  currentUserPlan,
  defaultIsYearly,
  onAddonsClick,
  onClose,
  onSelectPlan,
}: ComparisonModalContentProps) {
  const [isYearly, setIsYearly] = useState(defaultIsYearly);

  return (
    <div className="max-w-[160rem] mx-auto relative pt-0 lg:pt-15">
      {allowBillingCycleToggle && (
        <div className="absolute top-4 left-4 z-[60]">
          <PlanSelectionToggle isYearly={isYearly} onTabChange={setIsYearly} />
        </div>
      )}
      <CloseModalButton
        onClick={onClose}
        className="sticky lg:absolute top-4 ml-auto mr-4 right-0 z-[60]"
      />
      <div className="w-[98%] mx-auto overflow-auto">
        <ComparisonTable
          onSelectPlan={onSelectPlan}
          onAddonsClick={onAddonsClick}
          isYearly={isYearly}
          currentUserPlan={currentUserPlan}
        />
      </div>
    </div>
  );
}
