import React from "react";
import Heading from "@/shared/src/components/ui/Heading";
import Text from "@/shared/src/components/ui/Text";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";
import { PageOption } from "../utils/types";

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
    <div className="mt-[1.6rem]">
      <Heading size="sm">Select an option</Heading>
      <Text size="sm">Choose how we should fetch your website data.</Text>

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