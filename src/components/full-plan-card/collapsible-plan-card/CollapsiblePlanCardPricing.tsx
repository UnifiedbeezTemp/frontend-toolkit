import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { Plan } from "../../../api/services/plan/types";

interface CollapsiblePlanCardPricingProps {
  plan: Plan;
  displayPrice: number;
  isYearly: boolean;
}

export default function CollapsiblePlanCardPricing({
  plan,
  displayPrice,
}: CollapsiblePlanCardPricingProps) {
  const icons = useSupabaseIcons();
  const seats = plan.originalPlan.maxSeats ?? 0;
  const aiAssistants = plan.originalPlan.maxAiAssistants ?? 0;

  return (
    <div className="py-4 border-y border-inactive-color/30">
      <div className="flex justify-evenly items-center *:first:pl-2 sm:*:first:pl-5.25 *:last:pr-1.25 sm:*:last:pr-5.25 text-xs sm:text-md text-text-primary">
        <div className="flex items-baseline">
          <span>
            £{displayPrice}
          </span>
          <span>
            /month
          </span>
        </div>
        <div className="w-px bg-text-primary/25 self-stretch"/>
        <div className="flex items-center gap-[0.6rem]">
          <ImageComponent
            src={icons.seatsIcon}
            alt=""
            width={20}
            height={20}
            className="shrink-0"
          />
          <span>
            {seats} Seat{seats !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="w-px bg-text-primary/25 self-stretch"/>
        <div className="flex items-center gap-[0.6rem]">
         <ImageComponent
            src={icons.chatBot}
            alt=""
            width={20}
            height={20}
            className="shrink-0"
          />
          <span>
            {aiAssistants} AI Assistant{aiAssistants !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

