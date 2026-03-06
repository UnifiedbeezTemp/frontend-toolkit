import React from "react";
import MessageIcon from "../../../assets/icons/MessageIcon";
import TablerMessageIcon from "../../../assets/icons/TablerMessageIcon";
import { CommentIcon } from "../../../assets/icons/CommentIcon";

interface ChatFABProps {
  unreadCount: number;
  position: { x: number; y: number };
  isDragging: boolean;
  fabRef: React.RefObject<HTMLDivElement | null>;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
}

export default function ChatFAB({
  unreadCount,
  position,
  isDragging,
  fabRef,
  onMouseDown,
  onTouchStart,
}: ChatFABProps) {
  return (
    <div
      ref={fabRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      className="fixed bottom-[3rem] right-[3rem] z-[999] select-none"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <div className="relative w-[6.5rem] h-[6.5rem] rounded-full grad-btn flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer">
        <CommentIcon color="white" size={32} />

        {unreadCount > 0 && (
          <div className="absolute -top-[0.2rem] -right-[0.2rem] w-[2.4rem] h-[2.4rem] rounded-full bg-brand-secondary flex items-center justify-center shadow-md animate-bounce">
            <span className="text-[1.2rem] font-black text-brand-primary">
              {unreadCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
