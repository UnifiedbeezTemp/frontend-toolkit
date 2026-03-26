"use client";

import React, { useEffect, useMemo, useState } from "react";
import Modal from "../modal/Modal";
import ComparisonTable from "./ComparisonTable";
import CloseModalButton from "../modal/CloseModalButton";
import PlanSelectionToggle from "../plan-selection/tabs/PlanSelectionToggle";
import { useUser } from "../../contexts/UserContext";

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan?: (planId: string) => void;
  onAddonsClick?: (planId?: string) => void;
}

export default function ComparisonModal({
  isOpen,
  onClose,
  onSelectPlan,
  onAddonsClick,
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
      <div className="max-w-[160rem] mx-auto relative">
        <div className="absolute top-[-3rem] sm:top-0 left-[1.6rem] sm:left-[0rem] z-[60]">
          <PlanSelectionToggle isYearly={isYearly} onTabChange={setIsYearly} />
        </div>
        <CloseModalButton
          onClick={onClose}
          className="absolute top-0 right-0 z-[60]"
        />
        <ComparisonTable
          onSelectPlan={onSelectPlan}
          onAddonsClick={onAddonsClick}
          isYearly={isYearly}
        />
      </div>
    </Modal>
  );
}
