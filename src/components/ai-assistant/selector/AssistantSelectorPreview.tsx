"use client";

import ImageComponent from "../../ui/ImageComponent";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import SelectionChip from "../SelectionChip";
import { getColorScheme } from "../utils/colorSchemes";
import { getSelectionText } from "../utils/formatters";
import { AIAssistant } from "../../../types/aiAssistantTypes";

interface AssistantSelectorPreviewProps {
  assistant: AIAssistant;
  showChip?: boolean;
}

export default function AssistantSelectorPreview({
  assistant,
  showChip = true,
}: AssistantSelectorPreviewProps) {
  const icons = useSupabaseIcons();
  const selectionText = getSelectionText(assistant);
  const colorScheme = getColorScheme(selectionText);

  return (
    <div className="flex flex-col items-start gap-[1rem] w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-[0.5rem] items-center flex-1">
          <div className="border border-border rounded-[0.34rem] p-[0.34rem]">
            <ImageComponent
              src={icons.beeZoraWelcome}
              alt="logo"
              width={25}
              height={25}
            />
          </div>
          <p className="text-[1.6rem] text-text-primary">{assistant.name}</p>
          <div className="hidden sm:block">
            {showChip && selectionText && (
              <SelectionChip text={selectionText} colorScheme={colorScheme} />
            )}
          </div>
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
