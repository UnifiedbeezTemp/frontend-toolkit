"use client";

import { useCollapsiblePlanCard } from "./hooks/useCollapsiblePlanCard";
import CollapsiblePlanCardHeader from "./CollapsiblePlanCardHeader";
import CollapsiblePlanCardFooter from "./CollapsiblePlanCardFooter";
import { Plan } from "../../../api/services/plan/types";
import { cn } from "../../../lib/utils";
import ImageComponent from "../../ui/ImageComponent";
import { CollapsiblePlanCardProps } from "./types";

export default function ExpandedPlanCard({
  plan,
  isYearly,
  isSelected,
  isLowerThanCurrentPlan = false,
  onSelect,
  className,
  isSelectionDisabled
}: CollapsiblePlanCardProps) {
  const { displayPrice } = useCollapsiblePlanCard(plan, isYearly);

  const allFeatures = [...plan.availableFeatures, ...plan.unAvailableFeatures];

  return (
    <div
      className={cn(
        "grid grid-rows-subgrid row-span-11 pt-6 pb-4 px-0 w-full transition-all duration-300 bg-primary",
        className
      )}
    >
      <CollapsiblePlanCardHeader plan={plan} isExpanded={false} showChevron={false} />

      <div className="mt-4 flex justify-center items-center text-xs sm:text-md text-text-primary py-4 px-5.25 border-t border-t-border/70">
        <span>£{displayPrice}</span>
        <span>/month</span>
      </div>

      {allFeatures.map((feature, idx) => (
        <div
          key={idx}
          className="py-4 px-5.25 border-t border-t-border/70 flex items-center justify-center text-center"
        >
          <p className="text-md text-dark-base-70 whitespace-pre-line">{feature}</p>
        </div>
      ))}

      <CollapsiblePlanCardFooter
        plan={plan}
        isSelected={isSelected}
        isLowerThanCurrentPlan={isLowerThanCurrentPlan}
        onSelect={onSelect}
        isSelectionDisabled={isSelectionDisabled}
      />

      <div className="flex justify-center items-center text-xs gap-1 text-dark-base-70 mt-4">
        <ImageComponent
          src={plan.footerIcon}
          alt=""
          width={8}
          height={8}
        />
        {plan.footerText}
      </div>
    </div>
  );
}

