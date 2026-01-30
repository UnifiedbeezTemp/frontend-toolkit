"use client";

import { useState, useRef } from "react";
import AssistantDropdown from "./AssistantDropdown";
import AssistantSelectorPreview from "./AssistantSelectorPreview";
import ImageComponent from "../../ui/ImageComponent";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { AIAssistant } from "../../../types/aiAssistantTypes";
import { cn } from "../../../lib/utils";

interface AssistantSelectorProps {
  assistants: AIAssistant[];
  selectedAssistant: AIAssistant | null;
  onSelectAssistant: (id: string) => void;
  noBorder?: boolean;
  allowEmpty?: boolean;
  isLoading?: boolean;
}

export default function AssistantSelector({
  assistants,
  selectedAssistant,
  onSelectAssistant,
  noBorder = false,
  allowEmpty = false,
  isLoading = false,
}: AssistantSelectorProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const icons = useSupabaseIcons();

  const handleAssistantSelect = (id: string) => {
    onSelectAssistant(id);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (isLoading) {
    return (
      <div
        className={cn(
          "w-full px-[1.4rem] py-[1rem] rounded-[0.8rem] border border-input-stroke animate-pulse",
          "flex items-center justify-between bg-input-filled/50",
        )}
      >
        <div className="flex items-center gap-[1rem]">
          <div className="w-[3.2rem] h-[3.2rem] rounded-[0.4rem] bg-input-stroke" />
          <div className="space-y-1">
            <div className="h-[1.4rem] w-[12rem] bg-input-stroke rounded" />
            <div className="h-[1.2rem] w-[8rem] bg-input-stroke rounded" />
          </div>
        </div>
        <div className="w-[2rem] h-[2rem] bg-input-stroke rounded" />
      </div>
    );
  }

  if (!assistants.length) {
    return (
      <div className="text-center py-8 text-text-secondary">
        No assistants available. Please create one first.
      </div>
    );
  }

  if (!selectedAssistant && allowEmpty) {
    return (
      <div
        className={cn(
          "relative pb-[2rem]",
          noBorder ? "" : "border-b border-input-stroke pb-[2rem]",
        )}
      >
        <button
          ref={triggerRef}
          onClick={toggleDropdown}
          className="border w-full border-input-stroke px-[1.4rem] py-[1.6rem] rounded-[0.8rem] flex items-center justify-between hover:border-brand-primary transition-colors"
        >
          <div className="flex items-center gap-[1rem]">
            <div className="w-[4rem] h-[4rem] rounded-[0.4rem] border border-input-stroke flex items-center justify-center">
              <ImageComponent
                src={icons.beeZoraWelcome}
                alt="Select AI"
                width={24}
                height={24}
              />
            </div>
            <div className="text-left">
              <p className="text-text-primary font-[600] text-[1.4rem]">
                Select AI Assistant
              </p>
              <p className="text-text-secondary text-[1.2rem]">
                Click to choose an AI assistant for this account
              </p>
            </div>
          </div>
          <ImageComponent
            src={icons.chevronDown}
            alt="dropdown"
            width={20}
            height={20}
            className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        <AssistantDropdown
          isOpen={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
          triggerRef={triggerRef}
          assistants={assistants}
          selectedAssistantId={null}
          onSelectAssistant={handleAssistantSelect}
        />
      </div>
    );
  }

  if (!selectedAssistant) {
    return (
      <div className="text-center py-8 text-text-secondary">
        No assistants available. Please create one first.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative pb-[2rem]",
        noBorder ? "" : "border-b border-input-stroke pb-[2rem]",
      )}
    >
      <button
        ref={triggerRef}
        onClick={toggleDropdown}
        className="border w-full border-input-stroke px-[1.4rem] py-[1rem] rounded-[0.8rem] flex items-center justify-between hover:border-primary-90 transition-colors"
      >
        <div className="flex-1">
          <AssistantSelectorPreview
            assistant={selectedAssistant}
            showChip={true}
          />
        </div>
        <ImageComponent
          src={icons.chevronDown}
          alt="dropdown"
          width={20}
          height={20}
          className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AssistantDropdown
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        triggerRef={triggerRef}
        assistants={assistants}
        selectedAssistantId={selectedAssistant.id}
        onSelectAssistant={handleAssistantSelect}
      />
    </div>
  );
}
