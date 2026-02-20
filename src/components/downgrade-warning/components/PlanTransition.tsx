import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import ImageComponent from "../../ui/ImageComponent";
import Text from "../../ui/Text";
import PlanBadge from "./PlanBadge";

interface PlanTransitionProps {
  currentPlan: string;
  targetPlan: string;
}

export default function PlanTransition({
  currentPlan,
  targetPlan,
}: PlanTransitionProps) {
  const icons = useSupabaseIcons();
  return (
    <div className="flex items-center justify-between gap-[1.6rem] py-[1.6rem]">
      <div className="flex-1">
        <Text
          size="xs"
          className="text-text-primary uppercase tracking-wide mb-[0.4rem]"
        >
          Current Plan
        </Text>
        <div className="flex items-center gap-[0.8rem]">
          <PlanBadge planType={currentPlan} />
          <Text weight="bold" className="text-text-secondary capitalize">
            {currentPlan.toLocaleLowerCase()} Plan
          </Text>
        </div>
      </div>

      <div className="flex items-center justify-center w-[3.2rem]">
        <ImageComponent
          src={icons.arrowRight1}
          alt={"arrow"}
          width={20}
          height={20}
        />
      </div>

      <div className="flex-1 flex flex-col items-end justify-end">
        <div className="">
          <Text
            size="xs"
            className="text-text-primary uppercase tracking-wide mb-[0.4rem]"
          >
            Downgrading To
          </Text>
          <div className="flex items-center gap-[0.8rem]">
            <PlanBadge planType={targetPlan} />
            <Text weight="bold" className="text-text-secondary capitalize">
              {targetPlan.toLocaleLowerCase()} Plan
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
