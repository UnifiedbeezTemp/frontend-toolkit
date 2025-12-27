"use client";

import Card from "../ui/Card";
import { usePlanCard } from "./hooks/usePlanCard";
import PlanCardHeader from "./PlanCardHeader";
import PlanCardTitle from "./PlanCardTitle";
import PlanCardPricing from "./PlanCardPricing";
import PlanCardFeatures from "./PlanCardFeatures";
import PlanCardFooter from "./PlanCardFooter";
import { Plan } from "../../api/services/plan/types";

interface PlanCardProps {
  plan: Plan;
  isYearly: boolean;
  isSelected: boolean;
  onSelect: (planId: string) => void;
  className?: string;
  ctaText?: string;
  onClose?: () => void;
  isCompact?: boolean;
  onAddonsClick?: () => void;
}

export default function PlanCard({
  plan,
  isYearly,
  isSelected,
  onSelect,
  className,
  ctaText,
  onClose,
  isCompact,
  onAddonsClick,
}: PlanCardProps) {
  const { showFeatures, displayPrice, toggleFeatures } = usePlanCard(
    plan,
    isYearly
  );

  return (
    <Card
      className={`p-[1.6rem] rounded-[1.1rem] w-full transition-all duration-300 sm:flex flex-col gap-[8rem] ${
        isSelected ? "ring-1 ring-brand-primary" : ""
      } ${className}`}
    >
      <div>
        <PlanCardHeader
          plan={plan}
          isSelected={isSelected}
          onAddonsClick={onAddonsClick}
        />
        <PlanCardTitle plan={plan} />
        <PlanCardPricing
          plan={plan}
          displayPrice={displayPrice}
          isYearly={isYearly}
        />
        <PlanCardFeatures
          plan={plan}
          showFeatures={showFeatures}
          onToggle={toggleFeatures}
        />
      </div>

      <PlanCardFooter
        plan={plan}
        isSelected={isSelected}
        onSelect={onSelect}
        ctaText={ctaText}
        onClose={onClose}
        isCompact={isCompact}
      />
    </Card>
  );
}
