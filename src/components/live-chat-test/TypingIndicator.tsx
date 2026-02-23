"use client";

import ImageComponent from "../ui/ImageComponent";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import MarkdownText from "../../utils/MarkdownText";

interface TypingIndicatorProps {
  typingText: string;
  assistantName: string;
}

export default function TypingIndicator({
  typingText,
  assistantName,
}: TypingIndicatorProps) {
  const icons = useSupabaseIcons();

  if (typingText) {
    return (
      <div className="flex items-end gap-[1rem]">
        <div className="border border-input-stroke p-[0.6rem] rounded-full relative">
          <ImageComponent
            src={icons.beeGreenLeft}
            alt="Assistant"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="w-[1rem] h-[1rem] bg-success rounded-full border border-white absolute bottom-[-1px] right-0" />
        </div>

        <div className="flex flex-col gap-[0.7rem]">
          <div className="bg-soft-green border border-border rounded-[1.2rem] rounded-tl-none p-[1.2rem] max-w-[85%]">
            <div className="text-[1.6rem] text-text-secondary"><MarkdownText text={typingText} /></div>
          </div>

          <span className="text-[1.4rem] text-black font-[700]">BeeZora</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-[1rem]">
      <div className="border border-input-stroke p-[0.6rem] rounded-full relative">
        <ImageComponent
          src={icons.beeGreenLeft}
          alt="Assistant"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="w-[1rem] h-[1rem] bg-success rounded-full border border-white absolute bottom-[-1px] right-0" />
      </div>

      <div className="flex flex-col gap-[0.7rem]">
        <div className="bg-soft-green border border-border rounded-[1.2rem] rounded-tl-none p-[1.2rem]">
          <div className="flex space-x-[0.3rem]">
            <div className="w-[0.6rem] h-[0.6rem] bg-text-primary rounded-full animate-bounce"></div>
            <div
              className="w-[0.6rem] h-[0.6rem] bg-text-primary rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-[0.6rem] h-[0.6rem] bg-text-primary rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>

        <span className="text-[1.4rem] text-black font-[700]">Beezora</span>
      </div>
    </div>
  );
}
