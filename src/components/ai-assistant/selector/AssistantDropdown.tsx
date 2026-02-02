"use client";

import { RefObject } from "react";
import SmartDropdown from "../../smart-dropdown/SmartDropdown";
import AssistantHeader from "../AssistantHeader";
import { AIAssistant } from "../../../types/aiAssistantTypes";

interface AssistantDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
  assistants: AIAssistant[];
  selectedAssistantId: string | null;
  onSelectAssistant: (id: string) => void;
}

export default function AssistantDropdown({
  isOpen,
  onClose,
  triggerRef,
  assistants,
  selectedAssistantId,
  onSelectAssistant,
}: AssistantDropdownProps) {
  return (
    <SmartDropdown
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      maxHeight="30rem"
    >
      <div className="space-y-[1rem] p-[1rem] overflow-y-auto">
        {assistants.map((assistant, idx) => (
          <AssistantHeader
            key={assistant.id}
            assistant={assistant}
            isSelected={assistant.id === selectedAssistantId}
            onSelect={() => onSelectAssistant(assistant.id)}
            variant="desktop"
            index={idx}
          />
        ))}

        {assistants.length === 0 && (
          <div className="text-center py-4 text-text-secondary">
            No assistants available
          </div>
        )}
      </div>
    </SmartDropdown>
  );
}
