import React from "react";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import Button from "../ui/Button";
import Tooltip from "../ui/Tooltip";
import { Plan } from "../../api/services/plan/types";

interface PlanCardHeaderProps {
  plan: Plan;
  isSelected?: boolean;
  onAddonsClick?: () => void;
}

export default function PlanCardHeader({
  plan,
  isSelected,
  onAddonsClick,
}: PlanCardHeaderProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="flex items-start justify-between">
      {plan.badge}
      <div>
        {plan.addonAvailable ? (
          <Button
            variant="secondary"
            className="underline flex items-center gap-[0.5rem] text-brand-primary p-[0.8rem] text-[1.4rem]"
            onClick={() => {
              onAddonsClick?.();
            }}
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
          <Tooltip content="Add-ons not available on this plan. Upgrade for full access.">
            <Button
              variant="secondary"
              className="text-brand-primary p-[0.8rem] text-[1.4rem] text-inactive-color bg-input-filled cursor-default"
            >
              Add-on not available
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
