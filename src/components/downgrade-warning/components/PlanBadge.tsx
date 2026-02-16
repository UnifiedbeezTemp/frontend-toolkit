import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import BadgeIcon from "../../ui/BadgeIcon";
import { cn } from "../../../lib/utils";

interface PlanBadgeProps {
  planType: string;
  className?: string;
}

export default function PlanBadge({ planType, className }: PlanBadgeProps) {
  const icons = useSupabaseIcons();
  const type = planType.toLowerCase();

  switch (type) {
    case "individual":
      return (
        <BadgeIcon
          icon={icons.userWhite}
          hasPattern
          className={cn("bg-brand-primary", className)}
        />
      );
    case "business":
      return (
        <BadgeIcon
          icon={icons.luggage}
          hasPattern
          className={cn("bg-text-secondary", className)}
        />
      );
    case "premium":
      return (
        <BadgeIcon
          icon={icons.gem}
          hasPattern
          className={cn("bg-warning", className)}
        />
      );
    case "organisation":
      return (
        <BadgeIcon
          icon={icons.userGroup3}
          hasPattern={false}
          className={cn(
            "bg-[linear-gradient(165deg,#e6faf2_-11.22%,#e3cf9b_219.35%)]",
            className,
          )}
        />
      );
    default:
      return (
        <BadgeIcon
          icon={icons.userWhite}
          hasPattern
          className={cn("bg-brand-primary", className)}
        />
      );
  }
}
