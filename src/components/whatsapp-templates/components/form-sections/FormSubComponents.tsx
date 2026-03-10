import React from "react";
import { cn } from "@/shared/src/lib/utils";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";

interface CheckboxIndicatorProps {
  active: boolean;
}

export const CheckboxIndicator = ({ active }: CheckboxIndicatorProps) => {
  const icons = useSupabaseIcons() as { checkboxBase2: string };
  return (
    <div className="w-[2rem] h-[2rem] flex items-center justify-center shrink-0">
      {active ? (
        <ImageComponent
          src={icons.checkboxBase2}
          alt="selected"
          width={20}
          height={20}
        />
      ) : (
        <div className="w-[1.8rem] h-[1.8rem] rounded-full border border-input-stroke" />
      )}
    </div>
  );
};

interface SelectionCardProps {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

export const SelectionCard = ({
  label,
  active,
  onClick,
  icon,
}: SelectionCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 flex items-center justify-between px-[1.6rem] py-[1.2rem] rounded-[1.2rem] border transition-all duration-200",
        active
          ? "layout-body border-input-stroke text-text-secondary"
          : "bg-primary border-input-stroke text-text-primary hover:border-input-stroke/50",
      )}
    >
      <div className="flex items-center gap-[0.8rem]">
        <div
          className={cn(
            "flex items-center justify-center transition-colors duration-200",
            active ? "text-brand-primary" : "text-text-primary",
          )}
        >
          {icon}
        </div>
        <span className="text-[1.4rem] font-bold">{label}</span>
      </div>
      <CheckboxIndicator active={active} />
    </button>
  );
};
