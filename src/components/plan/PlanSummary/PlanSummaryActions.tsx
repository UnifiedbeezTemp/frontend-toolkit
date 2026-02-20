import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Button from "../../ui/Button";
import { OriginalPlan } from "../types";

export default function PlanSummaryActions({
  onUpgradePlan,
  isUpgradePlanDisabled,
  handleMoreClick,
}: {
  plan: OriginalPlan;
  onUpgradePlan?: () => void;
  isUpgradePlanDisabled?: boolean;
  handleMoreClick: () => void;
}) {
  const { threeDot } = useSupabaseIcons();
  return (
    <div className="flex flex-col justify-between md:items-end gap-6 w-full">
      <div className="flex items-stretch gap-4">
        <Button
          onClick={onUpgradePlan}
          disabled={isUpgradePlanDisabled}
          variant="primary"
          className="px-4 py-2 text-md shadow-none hover:bg-primary grow"
        >
          Upgrade Plan
        </Button>
        <Button
          onClick={handleMoreClick}
          variant="secondary"
          className="p-2 w-8.5 h-9.5"
        >
          <ImageComponent
            width={34}
            height={34}
            src={threeDot}
            alt="more"
            className="rotate-90"
          />
        </Button>
      </div>
    </div>
  );
}
