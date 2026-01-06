import Button from "../../ui/Button";
import { Plan } from "../../../api/services/plan/types";
import { cn } from "../../../lib/utils";

interface CollapsiblePlanCardFooterProps {
  plan: Plan;
  isSelected: boolean;
  isLowerThanCurrentPlan?: boolean;
  onSelect: (planId: string) => void;
  isSelectionDisabled?: boolean
}

export default function CollapsiblePlanCardFooter({
  plan,
  isSelected,
  isLowerThanCurrentPlan = false,
  onSelect,
  isSelectionDisabled
}: CollapsiblePlanCardFooterProps) {
  const getButtonVariant = () => {
    if (isSelected) return "secondary";
    if (isLowerThanCurrentPlan) return "outline";
    return "primary";
  };

  return (
    <div className="pt-2.25 px-5.5 border-t border-t-border/70">
      <Button
        className={cn(
          "w-full border border-brand-primary rounded-md py-2 text-md font-normal",
          isSelected && "opacity-40 text-primary-100 disabled:hover:shadow-none font-bold",
          isLowerThanCurrentPlan && "border-input-stroke text-text-secondary"
        )}
        variant={getButtonVariant()}
        disabled={isSelected || isSelectionDisabled}
        onClick={() => onSelect(plan.id)}
      >
        {isLowerThanCurrentPlan ? "Downgrade" :plan.ctaText}
      </Button>
    </div>
  );
}

