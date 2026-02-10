import ImageComponent from "next/image";
import Button from "../ui/Button";
import { cn } from "../../lib/utils";
import { Plan } from "../../api/services/plan/types";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";

interface PlanCardFooterProps {
  plan: Plan;
  isSelected: boolean;
  onSelect: (planId: string) => void;
  ctaText?: string;
  onClose?: () => void;
  isCompact?: boolean;
  isCurrentPlan?: boolean;
  isHero?: boolean;
}

export default function PlanCardFooter({
  plan,
  isSelected,
  onSelect,
  ctaText,
  onClose,
  isCompact,
  isCurrentPlan,
  isHero,
}: PlanCardFooterProps) {
  const icons = useSupabaseIcons();
  const iconSrc =
    icons[plan.footerIcon as keyof typeof icons] || plan.footerIcon;

  return (
    <div className="mt-auto pt-[2rem]">
      <Button
        className={cn(
          "w-full mb-[1.8rem] border",
          isCompact && "text-[1.2rem] py-[1rem]",
          isCurrentPlan
            ? "bg-muted text-dark-base-70 border-muted cursor-not-allowed hover:bg-muted"
            : "border-brand-primary",
        )}
        variant={isSelected ? "primary" : "secondary"}
        onClick={() => !isCurrentPlan && onSelect(plan.id)}
        disabled={isCurrentPlan}
      >
        {isCurrentPlan
          ? "Current Plan"
          : ctaText || plan.ctaText || "Talk to Sales"}
      </Button>

      {onClose && (
        <Button
          className={cn(
            "w-full mt-[-1rem] mb-[4rem] border",
            isCompact && "text-[1.2rem] py-[1rem]",
          )}
          variant="secondary"
          onClick={onClose}
        >
          Go Back
        </Button>
      )}

      <div className="flex items-center justify-center gap-[6px]">
        {iconSrc && (
          <ImageComponent width={20} height={20} src={iconSrc} alt="" />
        )}
        <span className="text-[1rem] text-text-primary">{plan.footerText}</span>
      </div>
    </div>
  );
}
