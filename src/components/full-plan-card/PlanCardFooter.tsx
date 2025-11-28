import ImageComponent from "next/image";
import Button from "../ui/Button";
import { cn } from "../../lib/utils";
import { Plan } from "../../api/services/plan/types";

interface PlanCardFooterProps {
  plan: Plan;
  isSelected: boolean;
  onSelect: (planId: string) => void;
}

export default function PlanCardFooter({
  plan,
  isSelected,
  onSelect,
}: PlanCardFooterProps) {
  return (
    <div className="mt-auto pt-[2rem]">
      <Button
        className={cn(
          "w-full mb-[1.8rem] border",
        )}
        variant={isSelected ? "primary" : "secondary"}
        onClick={() => onSelect(plan.id)}
      >
        {plan.ctaText}
      </Button>

      <div className="flex items-center justify-center gap-[3px]">
        <ImageComponent width={20} height={20} src={plan.footerIcon} alt="" />
        <span className="text-[1rem] text-text-primary">{plan.footerText}</span>
      </div>
    </div>
  );
}
