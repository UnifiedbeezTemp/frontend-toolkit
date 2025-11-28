import React from "react";
import { PageOption } from "../utils/types";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";
import ImageComponent from "../../../ui/ImageComponent";

interface OptionSelectorProps {
  selectedOption: PageOption;
  onDropdownToggle: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export default function OptionSelector({
  selectedOption,
  onDropdownToggle,
  triggerRef,
}: OptionSelectorProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="mt-[2.6rem] lg:mt-[1.6rem]">
      <Heading size="sm" className="text-[1.4rem] lg:text-[1.6rem]">Select an option</Heading>
      <Text size="sm" className="text-[1.4rem]">Choose how we should fetch your website data.</Text>

      <button
        className="flex items-center justify-between w-full border border-border rounded-[0.8rem] px-[1.4rem] py-[1rem] mt-[1.6rem] hover:border-brand-primary/50 transition-colors"
        ref={triggerRef}
        onClick={onDropdownToggle}
      >
        <span className="text-[1.6rem] text-text-primary">
          {selectedOption}
        </span>
        <ImageComponent
          src={icons.chevronDown}
          alt=""
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}