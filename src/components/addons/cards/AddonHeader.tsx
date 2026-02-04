import React from "react";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { Addon } from "../../../store/onboarding/types/addonTypes";
import Checkbox from "../../ui/CheckBox";
import DotsMenu from "../../ui/DotsMenu";
import Tooltip from "../../ui/Tooltip";
import ImageComponent from "../../ui/ImageComponent";
import Heading from "../../ui/Heading";

interface AddonHeaderProps {
  addon: Addon;
  isSelected: boolean;
  showCheckbox?: boolean;
  onRemove?: () => void;
  variant?: "add" | "manage";
}

export const AddonHeader: React.FC<AddonHeaderProps> = ({
  addon,
  isSelected,
  showCheckbox = true,
  onRemove,
  variant = "add",
}) => {
  const icons = useSupabaseIcons();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[1rem]">
        <div className="border border-input-stroke rounded-[1rem] p-[0.9rem] relative">
          {variant === "manage" && (addon.used || 0) > 0 && (
            <div className="absolute top-[-0.8rem] right-[-0.8rem] bg-destructive text-white text-[1.2rem] font-[700] w-[2.3rem] h-[2.3rem] rounded-full flex items-center justify-center border border-white">
              <div className="mt-[-.2rem] ml -[-.2rem] text-[1rem]">
                {addon.used}
              </div>
            </div>
          )}
          <ImageComponent
            src={addon.icon}
            alt={addon.name}
            width={20}
            height={20}
          />
        </div>
        <Heading size="sm">{addon.name}</Heading>
      </div>

      {variant === "manage" ? (
        <div className="relative">
          <Tooltip
            isInteractive
            contentClassName="w-[18rem]"
            content={
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove?.();
                }}
                className="flex items-center gap-[0.8rem] hover:bg-destructive/10 p-[0.4rem] px-[0.8rem] rounded-[0.4rem] transition-colors w-full text-text-primary text-[1.4rem] "
              >
                <ImageComponent
                  src={icons.trash3}
                  alt="Delete"
                  width={20}
                  height={20}
                />
                Delete Add-on
              </button>
            }
            position="bottom"
            className="w-auto"
          >
            <button className="p-[0.5rem] py-[1.4rem] border border-input-stroke hover:bg-input-filled rounded-[.8rem] transition-colors flex items-center">
              <DotsMenu />
            </button>
          </Tooltip>
        </div>
      ) : (
        showCheckbox && (
          <Checkbox
            className="rounded-full"
            checked={isSelected}
            onChange={() => {}}
          />
        )
      )}
    </div>
  );
};
