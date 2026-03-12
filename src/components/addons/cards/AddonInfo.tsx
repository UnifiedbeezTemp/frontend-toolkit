import { cn } from "../../../lib/utils";
import { Addon } from "../../../store/onboarding/types/addonTypes";

interface AddonInfoProps {
  addon: Addon;
}

export const AddonInfo: React.FC<AddonInfoProps> = ({ addon }) => {
  return (
    <div className="mt-[1.6rem] gap-[.7rem] flex flex-col items-start md:flex-row">
      <div className={cn("border border-input-stroke text-[1.4rem]  px-[1rem] py-[0.6rem] rounded-[0.8rem] inline-block font-medium", addon.isIncludedInPlan ? "text-muted" : "text-text-secondary")}>
        {addon.priceText}
      </div>
      {!addon.isIncludedInPlan && <div className={cn("border border-input-stroke text-[1.4rem]  px-[1rem] py-[0.6rem] rounded-[0.8rem] inline-block font-medium", addon.isIncludedInPlan ? "text-muted" : "text-text-secondary")}>
        {addon.limitText}
      </div>}
    </div>
  );
};
