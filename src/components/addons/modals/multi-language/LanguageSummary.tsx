import React from "react";
import Text from "../../../ui/Text";
import ImageComponent from "../../../ui/ImageComponent";
import { Addon } from "../../../../store/onboarding/types/addonTypes";

interface LanguageSummaryProps {
  selectedCount: number;
  totalPrice: number;
  addon: Addon;
  icons: any;
}

export const LanguageSummary: React.FC<LanguageSummaryProps> = ({
  selectedCount,
  totalPrice,
  addon,
  icons,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="mt-[2.4rem] p-[1.7rem] bg-success/10 rounded-[.8rem] flex items-start gap-[1.6rem]">
      <div className="w-[3.2rem] h-[3.2rem] bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
        <ImageComponent
          src={icons.infoOutline}
          alt="Info"
          width={20}
          height={20}
        />
      </div>
      <div>
        <Text className="text-[1.4rem] text-brand-primary font-bold">
          Adding {selectedCount} languages
        </Text>
        <Text className="text-[1.3rem] text-brand-primary">
          Your AI will automatically translate conversations in the selected
          languages. Cost <br /> £{totalPrice}/month (£{addon.price} x{" "}
          {selectedCount}).
        </Text>
      </div>
    </div>
  );
};
