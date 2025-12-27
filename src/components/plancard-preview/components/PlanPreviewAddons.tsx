"use client";

import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { Addon } from "../../../store/onboarding/types/addonTypes";
import Text from "../../ui/Text";
import Button from "../../ui/Button";

interface PlanPreviewAddonsProps {
  isAddons: boolean;
  planType?: string;
  addonsTotal: number;
  selectedAddons?: Addon[];
  onAddonsClick: () => void;
}

export default function PlanPreviewAddons({
  isAddons,
  planType,
  addonsTotal,
  selectedAddons,
  onAddonsClick,
}: PlanPreviewAddonsProps) {
  const icons = useSupabaseIcons();

  if (isAddons || planType?.toLowerCase() === "individual") {
    return null;
  }

  return (
    <div className="mt-[3rem] sm:mt-[5rem]">
      <Button
        variant="secondary"
        onClick={onAddonsClick}
        className="text-[1.3rem] font-[700] border-border bg-primary transition-all hover:scale-98 border rounded-[.3rem] px-[0.6rem] py-[.3rem]"
      >
        Add-ons {addonsTotal > 0 ? `£${addonsTotal}` : ""}
      </Button>

      <div className="flex flex-wrap items-center mt-[1rem] gap-[1rem]">
        {selectedAddons?.map((addon) => (
          <div className="flex items-start gap-[.62rem]" key={addon.id}>
            <div className="bg-success rounded-full flex items-center justify-center w-[1.5rem] h-[1.5rem] shrink-0">
              <ImageComponent
                src={icons.checkMark}
                alt=""
                width={10}
                height={10}
              />
            </div>
            <Text size="xs" className="font-[700] text-[1rem]">
              {addon.name} x {addon.used}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
