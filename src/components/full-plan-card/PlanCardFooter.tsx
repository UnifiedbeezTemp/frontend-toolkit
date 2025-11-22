import ImageComponent from "next/image";
import { Plan } from "../../data/plansData";
import Button from "../ui/Button";
import { cn } from "../../lib/utils";

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
          plan.buttonVariant === "primary"
            ? "text-white"
            : "text-brand-primary border-brand-primary",
          isSelected && "text-white"
        )}
        variant={isSelected ? "primary" : plan.buttonVariant}
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
