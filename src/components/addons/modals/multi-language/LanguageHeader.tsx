import React from "react";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";
import ImageComponent from "../../../ui/ImageComponent";
import CloseModalButton from "../../../modal/CloseModalButton";
import { Addon } from "../../../../store/onboarding/types/addonTypes";

interface LanguageHeaderProps {
  addon: Addon;
  onClose: () => void;
  maxLanguages: number;
  isUnlimited?: boolean;
}

export const LanguageHeader: React.FC<LanguageHeaderProps> = ({
  addon,
  onClose,
  maxLanguages,
  isUnlimited = false,
}) => {
  return (
    <div className="flex items-center justify-between mb-[2.4rem]">
      <div className="flex items-center gap-[1.2rem]">
        <div className="border border-input-stroke rounded-[1rem] p-[0.9rem]">
          <ImageComponent
            src={addon.icon}
            alt={addon.name}
            width={24}
            height={24}
          />
        </div>
        <div>
          <Heading size="sm" className="text-[2rem] leading-none mb-[0.4rem]">
            {addon.name}
          </Heading>
          <Text className="text-text-secondary text-[1.4rem]">
            {isUnlimited
              ? "Select any number of languages for AI translation support."
              : `Select up to ${maxLanguages} languages for AI translation support.`}
          </Text>
        </div>
      </div>
      <CloseModalButton onClick={onClose} />
    </div>
  );
};
