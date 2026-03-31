"use client";

import ImageComponent from "../ui/ImageComponent";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import Checkbox from "../ui/CheckBox";
import SelectionChip from "./SelectionChip";
import { getAssistantColorScheme } from "./utils/colorSchemes";
import { getSelectionText } from "./utils/formatters";
import { AssistantHeaderProps } from "./types";
import { cn } from "../../lib/utils";

export default function AssistantHeader({
  assistant,
  index,
  isSelected,
  isExpanded,
  showChip = true,
  onSelect,
  onToggle,
  variant = "mobile",
  rightElement,
}: AssistantHeaderProps) {
  const icons = useSupabaseIcons();
  const selectionText = getSelectionText(assistant);
  const colorScheme = getAssistantColorScheme(index);
  const isDesktop = variant === "desktop";

  if (isDesktop) {
    return (
      <div
        onClick={onSelect}
        className={cn(
          "w-full px-[1rem] py-[1rem] rounded-[0.8rem] border transition-all cursor-pointer",
          isSelected
            ? "border-brand-primary/50 bg-primary"
            : "border-border hover:border-brand-primary/50 hover:bg-brand-primary/2",
        )}
      >
        <div className="flex flex-col items-start gap-[1rem]">
          <div className="flex items-center gap-[0.5rem] flex-1">
            <div className="border border-border rounded-[0.34rem] p-[0.34rem]">
              <ImageComponent
                src={icons.beeZoraWelcome}
                alt="logo"
                width={25}
                height={25}
              />
            </div>
            <p className="text-[1.6rem] font-medium text-text-primary">
              {assistant.name}
            </p>
            {showChip && selectionText && (
              <div className="hidden x l:block">
                <SelectionChip text={selectionText} colorScheme={colorScheme} />
              </div>
            )}
          </div>
          <div className="flex w-full items-center gap-[1rem] justify-between">
            {showChip && selectionText && (
              <div className="x l:hidden">
                <SelectionChip text={selectionText} colorScheme={colorScheme} />
              </div>
            )}
            <div className="flex items-center justify-between gap-[1rem]">
            {rightElement && <div>{rightElement}</div>}
            <Checkbox
              checked={isSelected || false}
              onChange={() => onSelect?.()}
              className="rounded-full"
              // size="sm"
            />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[2rem]" onClick={onToggle}>
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-[0.5rem] items-center">
          <div className="border border-border rounded-[0.34rem] p-[0.34rem]">
            <ImageComponent
              src={icons.beeZoraWelcome}
              alt="logo"
              width={25}
              height={25}
            />
          </div>
          <p className="text-[1.6rem] text-text-primary">{assistant.name}</p>
        </div>
        <div className="flex items-center gap-[1rem]">
          <div className="hidden sm:block">
            {showChip && selectionText && (
              <SelectionChip text={selectionText} colorScheme={colorScheme} />
            )}
          </div>
          {rightElement && <div>{rightElement}</div>}
          <button className="flex items-center justify-center w-[2rem] h-[2rem] shrink-0">
            {isExpanded ? (
              <ImageComponent
                src={icons.checkboxBase2}
                alt="expanded"
                width={20}
                height={20}
              />
            ) : (
              <div className="border border-border rounded-full w-[1.6rem] h-[1.6rem]" />
            )}
          </button>
        </div>
      </div>
      {showChip && selectionText && (
        <div className="sm:hidden">
          <SelectionChip text={selectionText} colorScheme={colorScheme} />
        </div>
      )}
    </div>
  );
}
