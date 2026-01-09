"use client";

import ImageComponent from "../ui/ImageComponent";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";

interface ChatInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  disabled: boolean;
}

export default function ChatInput({
  inputText,
  setInputText,
  onSendMessage,
  onKeyPress,
  disabled,
}: ChatInputProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="p-[1rem] sticky bottom-0 bg-primary border-t border-border rounded-es-[1.6rem] rounded-ee-[1.6rem]">
      <div className="flex items-center gap-[1rem]">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Type a message"
          className="flex-1 text-dark-base-70 placeholder:text-dark-base-70 rounded-[0.8rem] px-[1.6rem] py-[1rem] text-[1.6rem] focus:outline-none bg-transparent"
          disabled={disabled}
        />
        <button
          onClick={onSendMessage}
          disabled={!inputText.trim() || disabled}
          className="bg-brand-primary text-white p-[1rem] rounded-[0.8rem] hover:bg-brand-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ImageComponent src={icons.send} alt="Send" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
