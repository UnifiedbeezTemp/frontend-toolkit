import React from "react";
import {
  AUTOMATION_TYPES,
  AutomationType,
} from "../../hooks/useGeneralTemplateForm";
import ChevronDownIcon from "../../../../assets/icons/ChevronDownIcon";
import SmartDropdown from "../../../smart-dropdown/SmartDropdown";

interface AutomationTypeDropdownProps {
  currentValue: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (type: AutomationType) => void;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export const AutomationTypeDropdown = ({
  currentValue,
  isOpen,
  onToggle,
  onSelect,
  onClose,
  triggerRef,
}: AutomationTypeDropdownProps) => (
  <div className="flex flex-col gap-[0.8rem]">
    <label className="text-[1.4rem] font-bold text-text-secondary">
      Add to list
    </label>
    <div className="relative group">
      <button
        ref={triggerRef}
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full px-[1.6rem] py-[1.2rem] rounded-[1rem] border border-input-stroke text-[1.4rem] bg-white text-text-secondary hover:border-text-primary transition-colors"
      >
        <span>{currentValue}</span>
        <ChevronDownIcon size={14} className="opacity-50" />
      </button>
      <SmartDropdown isOpen={isOpen} onClose={onClose} triggerRef={triggerRef}>
        {AUTOMATION_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className="w-full px-[1.6rem] py-[1rem] text-left text-[1.4rem] hover:bg-black-5 font-medium text-text-secondary"
          >
            {type}
          </button>
        ))}
      </SmartDropdown>
    </div>
  </div>
);
