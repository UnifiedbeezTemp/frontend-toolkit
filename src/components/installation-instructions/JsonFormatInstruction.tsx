"use client";

import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import ImageComponent from "../ui/ImageComponent";
import Text from "../ui/Text";


interface JsonFormatInstructionProps {
  lines: string[];
  copied: boolean;
  onCopy: () => void;
  tagLabel?: string;
  tagClassName?: string;
}

export default function JsonFormatInstruction({
  lines,
  copied,
  onCopy,
  tagLabel,
  tagClassName,
}: JsonFormatInstructionProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="mb-[3.2rem]">
      {tagLabel && (
        <div
          className={`inline-block px-[1.2rem] py-[0.4rem] rounded-[0.6rem] mb-[1.2rem] ${
            tagClassName || "bg-primary"
          }`}
        >
          <Text className="text-[1.2rem] font-bold">{tagLabel}</Text>
        </div>
      )}

      <div className="bg-primary rounded-[1.2rem] border border-input-stroke overflow-hidden shadow-lg">
        <div className="flex bg-primary">
          <div className="py-[1.6rem] px-[1.2rem] border-r border-input-stroke flex flex-col items-center bg-soft-green">
            {lines.map((_, idx) => (
              <span
                key={idx}
                className="text-danger-110 font-mono text-[1.4rem] leading-[2.2rem] select-none"
              >
                {idx + 1}
              </span>
            ))}
          </div>

          <div className="p-[1.6rem] font-mono text-[1.4rem] flex-1">
            {lines.map((line, idx) => (
              <div key={idx} className="flex leading-[2.2rem]">
                <span className="text-danger-110 whitespace-pre font-mono">
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-[1.6rem] py-[1.2rem] bg-soft-green border-t border-input-stroke bg-primary flex items-center justify-between">
          <button
            onClick={onCopy}
            className="flex items-center gap-[0.8rem] text-text-primary text-[1.2rem] font-[700] hover:opacity-70 transition-opacity"
          >
            <ImageComponent
              src={icons.copy3}
              alt="copy"
              width={20}
              height={20}
              className="opacity-70"
            />
            {copied ? "Copied!" : "Copy code"}
          </button>
        </div>
      </div>
    </div>
  );
}
