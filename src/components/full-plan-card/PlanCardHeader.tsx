import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import Button from "../ui/Button";
import { Plan } from "../../api/services/plan/types";

interface PlanCardHeaderProps {
  plan: Plan;
}

export default function PlanCardHeader({ plan }: PlanCardHeaderProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="flex items-start justify-between">
      {plan.badge}
      <div>
        {plan.addonAvailable ? (
          <Button
            variant="secondary"
            className="underline flex items-center gap-[0.5rem] text-brand-primary p-[0.8rem] text-[1.4rem]"
          >
            Add-on available
            <ImageComponent
              src={icons.linkExternal}
              alt=""
              width={20}
              height={20}
            />
          </Button>
        ) : (
          <Button
            variant="secondary"
            className="text-brand-primary p-[0.8rem] text-[1.4rem] text-inactive-color bg-input-filled"
          >
            Add-on not available
          </Button>
        )}
      </div>
    </div>
  );
}
