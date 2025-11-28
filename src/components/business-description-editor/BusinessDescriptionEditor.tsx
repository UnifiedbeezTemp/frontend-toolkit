import { useState, useEffect } from "react";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import Loader from "../ui/Loader";

interface BusinessDescriptionEditorProps {
  description: string;
  isEnhancing: boolean;
  isTyping: boolean;
  typedText: string;
  maxCharacters: number;
  isEnhanceButtonDisabled: boolean;
  onDescriptionChange: (value: string) => void;
  onEnhanceWithBeeZaro: () => void;
}

export default function BusinessDescriptionEditor({
  description,
  isEnhancing,
  isTyping,
  typedText,
  maxCharacters,
  isEnhanceButtonDisabled,
  onDescriptionChange,
  onEnhanceWithBeeZaro,
}: BusinessDescriptionEditorProps) {
  const icons = useSupabaseIcons();
  const [displayText, setDisplayText] = useState(description);

  useEffect(() => {
    if (isTyping) {
      setDisplayText(typedText);
    } else {
      setDisplayText(description);
    }
  }, [description, isTyping, typedText]);

  return (
    <div className="border-border border p-[1.6rem] rounded-[1.6rem] focus-within:shadow-[0_0_0_5px_rgba(5,61,39,0.1)] transition-shadow bg-primary">
      <div className="flex items-center justify-between">
        <span className="text-[1.6rem] font-[700] text-brand-primary">
          Business overview
        </span>
        <button
          onClick={onEnhanceWithBeeZaro}
          disabled={isEnhanceButtonDisabled}
          className="hidden text-[1.4rem] font-[700] text-text-primary sm:flex items-center gap-[.5rem] disabled:opacity-50 disabled:cursor-not-allowed hover:text-brand-primary transition-colors"
        >
          {isEnhancing ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
            </>
          ) : isTyping ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
            </>
          ) : (
            <>
              <ImageComponent
                src={icons.beeGreyLeft}
                alt=""
                width={20}
                height={20}
              />
              <span>Enhance with BeeZora</span>
            </>
          )}
        </button>
      </div>

      <textarea
        value={displayText}
        onChange={(e) => onDescriptionChange(e.target.value)}
        className="focus:ring-0 focus:outline-0 border-0 mt-[1.4rem] text-text-primary block w-full text-[1.6rem] min-h-[8rem] resize-none placeholder-text-primary/50 min-h-[30rem] sm:min-h-[12.8rem]"
        placeholder="Enter business description"
        disabled={isTyping}
        rows={6}
      />

      <div className="flex justify-between sm:justify-end items-center mt-2">
        <p className="text-[1rem] text-text-primary">
          {description.length}/{maxCharacters} characters
        </p>

        <button
          onClick={onEnhanceWithBeeZaro}
          disabled={isEnhanceButtonDisabled}
          className="sm:hidden text-[1.4rem] font-[700] text-brand-primary flex items-center gap-[.5rem] disabled:opacity-50 disabled:cursor-not-allowed hover:text-brand-primary transition-colors"
        >
          {isEnhancing ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
            </>
          ) : isTyping ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
            </>
          ) : (
            <>
              <ImageComponent
                src={icons.beeGreenLeft}
                alt=""
                width={20}
                height={20}
              />
              <span>Enhance with BeeZora</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
