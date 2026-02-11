"use client";

import Modal from "../../modal/Modal";
import PlanCard from "../../full-plan-card/PlanCard";
import { Plan } from "../../../api/services/plan/types";

interface PlanPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan;
  isYearly: boolean;
  totalPrice: number;
  onAddonsClick: () => void;
  onSelect: () => void;
}

export default function PlanPreviewModal({
  isOpen,
  onClose,
  plan,
  isYearly,
  totalPrice,
  onAddonsClick,
  onSelect,
}: PlanPreviewModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isBlur
      className="!overflow-visible"
      overflow={false}
    >
      <PlanCard
        plan={plan}
        isYearly={isYearly}
        isSelected={true}
        onSelect={onSelect}
        overridePrice={totalPrice}
        onClose={onClose}
        onAddonsClick={onAddonsClick}
        isCompact={true}
        className={"layout-body w-[30rem] border-0"}
        ctaText="Change plan"
      />
    </Modal>
  );
}
