import ImageComponent from "next/image";
import Button from "../ui/Button";
import { cn } from "../../lib/utils";
import { Plan } from "../../api/services/plan/types";

interface PlanCardFooterProps {
  plan: Plan;
  isSelected: boolean;
  onSelect: (planId: string) => void;
  ctaText?: string;
  onClose?: () => void;
  isCompact?: boolean;
}

export default function PlanCardFooter({
  plan,
  isSelected,
  onSelect,
  ctaText,
  onClose,
  isCompact,
}: PlanCardFooterProps) {
  return (
    <div className="mt-auto pt-[2rem]">
      {plan.id?.toLowerCase() === "organisation" ? (
        <div
          className={cn(
            "w-full mb-[1.8rem] px-[1.6rem] py-[1.2rem] bg-brand-primary text-white text-center rounded-[0.8rem] font-[700] border border-brand-primary",
            isCompact && "text-[1.2rem] py-[1rem]"
          )}
        >
          {ctaText || plan.ctaText || "Talk to Sales"}
        </div>
      ) : (
        <Button
          className={cn(
            "w-full mb-[1.8rem] border",
            isCompact && "text-[1.2rem] py-[1rem]"
          )}
          variant={isSelected ? "primary" : "secondary"}
          onClick={() => onSelect(plan.id)}
        >
          {ctaText || plan.ctaText}
        </Button>
      )}

      {onClose && (
        <Button
          className={cn(
            "w-full mt-[-1rem] mb-[4rem] border",
            isCompact && "text-[1.2rem] py-[1rem]"
          )}
          variant="secondary"
          onClick={onClose}
        >
          Go Back
        </Button>
      )}

      <div className="flex items-center justify-center gap-[3px]">
        <ImageComponent width={20} height={20} src={plan.footerIcon} alt="" />
        <span className="text-[1rem] text-text-primary">{plan.footerText}</span>
      </div>
    </div>
  );
}
