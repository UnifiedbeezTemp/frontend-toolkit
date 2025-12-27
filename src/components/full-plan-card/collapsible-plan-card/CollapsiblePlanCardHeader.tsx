import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Button from "../../ui/Button";
import { Plan } from "../../../api/services/plan/types";
import { cn } from "../../../lib/utils";

interface CollapsiblePlanCardHeaderProps {
  plan: Plan;
  isExpanded?: boolean;
  showChevron?: boolean
}

export default function CollapsiblePlanCardHeader({
  plan,
  isExpanded,
  showChevron
}: CollapsiblePlanCardHeaderProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="px-5.25 w-full relative">
      <div className="flex items-center justify-between relative">
        <div className="flex flex-wrap md:flex-col lg:flex-row xl:flex-col items-center md:items-start gap-3.5 lg:gap-3.25">
          {plan.badge}
          <h3 className="text-brand-primary font-bold text-base">
            {plan.title}
          </h3>
          <span className="md:absolute lg:static xl:absolute block whitespace-nowrap md:left-16 ">{plan.tag}</span>
        </div>
       {showChevron
        && <button
          className="flex items-center justify-center p-1.25 self-start"
          aria-label={isExpanded ? "Collapse plan details" : "Expand plan details"}
        >
          <ImageComponent
            src={icons.chevronDown}
            alt=""
            width={24}
            height={24}
            className={cn(
              "transition-transform duration-300 shrink-0",
              isExpanded ? "rotate-180" : ""
            )}
          />
        </button>}
      </div>
      <div className="mt-2.5 *:border *:border-border *:rounded-[0.325rem] *:px-1.25 *:py-0.5">
        {plan.addonAvailable ? (
          <button className="inline-flex items-center gap-1.25 text-dark-base-70 text-md font-medium">
            Add-on available
            <ImageComponent
              src={icons.linkExternal}
              alt=""
              width={16}
              height={16}
            />
          </button>
        ) : (
          <span className="inline-block text-md text-inactive-color bg-[#F5F5F5] rounded-sm px-[1.2rem]">
            Add-on not available
          </span>
        )}
      </div>
    </div>
  );
}

