import { Send, Smile } from "lucide-react";
import { PaperclipIcon } from "../../../assets/icons/PaperclipIcon";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function ChatInput({
  value,
  onChange,
  onSubmit,
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="px-[1.6rem] pb-[1.2rem] flex flex-col gap-[0.8rem] pt-[1rem] border-t border-border">
      <div className="flex items-center gap-[1.2rem]">
        <button className="text-text-primary hover:text-text-primary transition-colors p-[0.4rem]">
          <PaperclipIcon size={20} />
        </button>
        <div className="flex-1 flex items-center gap-[0.8rem] border border-border rounded-[1rem] px-[1.2rem] py-[0.8rem] bg-input-filled">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 text-[1.4rem] text-text-primary bg-transparent outline-none placeholder:text-muted"
          />
          <button className="text-muted hover:text-text-primary transition-colors p-[0.2rem]">
            <Smile size={18} />
          </button>
        </div>
        <button
          onClick={onSubmit}
          disabled={!value.trim()}
          className="w-[4.4rem] h-[4.4rem] rounded-[1rem] grad-btn flex items-center justify-center text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
        >
          <Send size={18} />
        </button>
      </div>
      <p className="text-center text-[1.2rem] text-muted italic">
        We typically reply within a few minutes
      </p>
    </div>
  );
}
