import React from "react";
import CurvyArrowIcon from "@/shared/src/assets/icons/CurvyArrowIcon";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";
import SmartDropdown from "@/shared/src/components/smart-dropdown/SmartDropdown";
import { TemplateButton } from "../../types";

interface TypeSelectionDropdownProps {
  btn: TemplateButton;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onSelect: (t: string) => void;
  icons: { gridDropdown: string };
}

export function TypeSelectionDropdown({
  btn,
  triggerRef,
  isOpen,
  onToggle,
  onClose,
  onSelect,
  icons,
}: TypeSelectionDropdownProps) {
  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-[1.3rem] font-bold text-text-secondary">
        Type
      </label>
      <div className="relative">
        <button
          ref={triggerRef}
          onClick={onToggle}
          className="w-full h-[4.2rem] flex items-center justify-between px-[1.2rem] bg-primary border border-input-stroke rounded-[0.8rem] text-left"
        >
          <div className="flex items-center gap-[0.8rem]">
            <CurvyArrowIcon size={16} color="var(--text-secondary)" />
            <span className="text-[1.4rem] text-text-secondary font-medium">
              {btn.type}
            </span>
          </div>
          <ImageComponent
            src={icons.gridDropdown}
            alt="v"
            width={16}
            height={16}
          />
        </button>
        <SmartDropdown
          isOpen={isOpen}
          onClose={onClose}
          triggerRef={triggerRef}
        >
          {["Quick reply", "URL", "Phone number"].map((t) => (
            <button
              key={t}
              onClick={() => onSelect(t)}
              className="w-full px-[1.2rem] py-[0.8rem] text-left text-[1.4rem] hover:bg-input-filled/50 font-medium text-text-secondary"
            >
              {t}
            </button>
          ))}
        </SmartDropdown>
      </div>
    </div>
  );
}
