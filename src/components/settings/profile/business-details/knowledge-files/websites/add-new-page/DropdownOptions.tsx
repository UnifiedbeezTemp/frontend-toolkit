import React from "react";
import { SmartDropdown } from "@/shared/src/components/smart-dropdown";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";
import { cn } from "@/shared/src/lib/utils";
import { PageOption } from "../utils/types";

interface DropdownOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  selectedOption: PageOption;
  onOptionChange: (option: PageOption) => void;
}

export default function DropdownOptions({
  isOpen,
  onClose,
  triggerRef,
  selectedOption,
  onOptionChange,
}: DropdownOptionsProps) {
  const icons = useSupabaseIcons();
  const options: PageOption[] = ["Page with all subpages", "Just this page"];

  return (
    <SmartDropdown
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      className="w-fit z-[1100]"
    >
      <div className="flex flex-col gap-[1.6rem] items-start px-[1.4rem] py-[1rem]">
        {options.map((option, idx) => (
          <button
            onClick={() => {
              onOptionChange(option);
              onClose();
            }}
            className={cn(
              "text-[1.6rem] text-text-primary flex items-center justify-between p-[0.8rem] w-full",
              option === selectedOption ? "bg-[#F7FFFC]" : ""
            )}
            key={idx}
          >
            <span>{option}</span>
            {option === selectedOption && (
              <ImageComponent
                src={icons.check}
                alt=""
                width={20}
                height={20}
              />
            )}
          </button>
        ))}
      </div>
    </SmartDropdown>
  );
}