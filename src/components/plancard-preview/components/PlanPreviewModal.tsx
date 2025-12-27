"use client";

import Modal from "../../modal/Modal";
import PlanCard from "../../full-plan-card/PlanCard";
import { Plan } from "../../../api/services/plan/types";

interface PlanPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan;
  isYearly: boolean;
  onAddonsClick: () => void;
  onSelect: () => void;
}

export default function PlanPreviewModal({
  isOpen,
  onClose,
  plan,
  isYearly,
  onAddonsClick,
  onSelect,
}: PlanPreviewModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isBlur>
      <PlanCard
        plan={plan}
        isYearly={isYearly}
        isSelected={true}
        onSelect={onSelect}
        ctaText={plan.id === "organisation" ? "Talk to Sales" : "Upgrade Plan"}
        onClose={onClose}
        onAddonsClick={onAddonsClick}
        isCompact={true}
        className={"layout-body max-w-[30rem]"}
      />
    </Modal>
  );
}
