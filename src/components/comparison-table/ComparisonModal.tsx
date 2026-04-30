"use client";

import React, { useEffect, useMemo, useState } from "react";
import Modal from "../modal/Modal";
import ComparisonTable from "./ComparisonTable";
import CloseModalButton from "../modal/CloseModalButton";
import PlanSelectionToggle from "../plan-selection/tabs/PlanSelectionToggle";
import { useUser } from "../../contexts/UserContext";
import { OriginalPlan } from "../plan/types";


interface ComparisonModalProps {
  isOpen: boolean;
  allowBillingCycleToggle?: boolean;
  onClose: () => void;
  onSelectPlan?: (planId: string) => void;
  onAddonsClick?: (planId?: string) => void;
  currentUserPlan?: OriginalPlan
}

export default function ComparisonModal({
  isOpen,
  onClose,
  onSelectPlan,
  onAddonsClick,
  allowBillingCycleToggle = true,
  currentUserPlan
}: ComparisonModalProps) {
  const { user } = useUser();
  const defaultIsYearly = useMemo(() => {
    if (user?.planBillingInterval === "YEARLY") return true;
    if (user?.billing_cycle?.toLowerCase() === "yearly") return true;
    return false;
  }, [user?.billing_cycle, user?.planBillingInterval]);

  const [isYearly, setIsYearly] = useState(defaultIsYearly);

  useEffect(() => {
    if (isOpen) setIsYearly(defaultIsYearly);
  }, [defaultIsYearly, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="fullscreen"
      className="w-[calc(100vw-2rem)] lg:w-fit rounded-[2.5rem] mx-auto overflow-hidden"
    >
      <div className="max-w-[160rem] mx-auto relative pt-0 lg:pt-15">
        {allowBillingCycleToggle && <div className="absolute top-4 left-4 z-[60]">
          <PlanSelectionToggle isYearly={isYearly} onTabChange={setIsYearly} />
        </div>}
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
    </Modal>
  );
}
