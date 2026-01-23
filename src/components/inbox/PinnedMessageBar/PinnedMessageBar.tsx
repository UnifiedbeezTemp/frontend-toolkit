"use client";

import { Pin } from "lucide-react";
import { cn } from "../../../lib/utils";

interface PinnedMessageBarProps {
  messageText: string;
  onUnpin?: () => void;
  className?: string;
}

export default function PinnedMessageBar({
  messageText,
  onUnpin,
  className,
}: PinnedMessageBarProps) {
  const displayText =
    messageText.length > 50
      ? `${messageText.substring(0, 50)}...`
      : messageText;

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 border-b border-input-stroke bg-primary",
        className,
      )}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-input-filled">
        <Pin size={16} className="text-brand-primary" />
      </div>
      <span className="text-[1.4rem] text-dark-base-70 flex-1 truncate font-medium">
        {displayText}
      </span>
      {onUnpin && (
        <button
          type="button"
          onClick={onUnpin}
          className="text-dark-base-40 hover:text-dark-base-70 text-sm underline"
        >
          Unpin
        </button>
      )}
    </div>
  );
}
