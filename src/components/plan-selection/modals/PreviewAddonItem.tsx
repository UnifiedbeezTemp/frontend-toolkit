import React from "react";
import ImageComponent from "../../ui/ImageComponent";
import Heading from "../../ui/Heading";
import { Addon } from "../../../store/onboarding/types/addonTypes";

interface PreviewAddonItemProps {
  addon: Addon;
}

export const PreviewAddonItem: React.FC<PreviewAddonItemProps> = ({
  addon,
}) => {
  return (
    <div className="border border-input-stroke rounded-[1.6rem] p-[1.6rem] sm:p-[2.4rem]">
      <div className="flex items-center gap-[1rem]">
        <div className="border border-input-stroke rounded-[1rem] p-[0.9rem]">
          <ImageComponent
            src={addon.icon}
            alt={addon.name}
            width={20}
            height={20}
          />
        </div>
        <Heading size="sm">{addon.name}</Heading>
      </div>

      <div className="mt-[1.6rem] gap-[0.7rem] flex flex-col items-start md:flex-row">
        <div className="border border-input-stroke text-[1.4rem] text-text-secondary px-[1rem] py-[0.6rem] rounded-[0.8rem] inline-block font-medium">
          {addon.priceText}
        </div>
        <div className="border border-input-stroke text-[1.4rem] text-text-secondary px-[1rem] py-[0.6rem] rounded-[0.8rem] inline-block font-medium">
          {addon.limitText}
        </div>
      </div>
    </div>
  );
};
