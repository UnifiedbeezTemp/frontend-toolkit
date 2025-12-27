"use client";

import Card from "../../ui/Card";
import { useCollapsiblePlanCard } from "./hooks/useCollapsiblePlanCard";
import CollapsiblePlanCardHeader from "./CollapsiblePlanCardHeader";
import CollapsiblePlanCardPricing from "./CollapsiblePlanCardPricing";
import CollapsiblePlanCardFeatures from "./CollapsiblePlanCardFeatures";
import CollapsiblePlanCardFooter from "./CollapsiblePlanCardFooter";
import { cn } from "../../../lib/utils";
import ExpandableCard from "../../expandable-card/ExpandableCard";
import { useToggle } from "../../../hooks/useToggle";
import { CollapsiblePlanCardProps } from "./types";

export default function CollapsiblePlanCard({
  plan,
  isYearly,
  isSelected,
  isLowerThanCurrentPlan = false,
  onSelect,
  defaultExpanded = false,
  className,
}: CollapsiblePlanCardProps) {
  const { displayPrice } = useCollapsiblePlanCard(plan, isYearly);
  const { value: expanded, toggle: toggleExpanded } = useToggle(defaultExpanded)

  return (
    <Card
      className={cn("pt-6 pb-4 px-0 rounded-[1.2rem] w-full transition-all duration-300 max-w-xl", `${className}`)}>
      <ExpandableCard 
        title={plan.title} 
        summaryClassName="p-0"
        containerClassName="p-0"
        summary={     
          <CollapsiblePlanCardHeader
            plan={plan}
            isExpanded={expanded}
            showChevron
          />
        } 
        isExpanded={expanded} 
        toggleExpanded={toggleExpanded}
        detailsClassName="bg-transparent px-0! border-none m-0 py-0"
      >
        <div className="mt-4.75">
          <CollapsiblePlanCardPricing
            plan={plan}
            displayPrice={displayPrice}
            isYearly={isYearly}
          />
          <div className="bg-input-filled divide-y divide-border">
            <CollapsiblePlanCardFeatures plan={plan} />
          </div>
          <CollapsiblePlanCardFooter
            plan={plan}
            isSelected={isSelected}
            isLowerThanCurrentPlan={isLowerThanCurrentPlan}
            onSelect={onSelect}
          />
        </div>
      </ExpandableCard>
    </Card>
  );
}

