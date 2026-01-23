"use client";

import { Pin, MessageSquare, Share2, Trash2 } from "lucide-react";
import SmartDropdown from "../../smart-dropdown/SmartDropdown";
import { MessageOptionsMenuProps } from "./types";
import { cn } from "../../../lib/utils";

export default function MessageOptionsMenu({
  isOpen,
  onClose,
  messageId,
  messageText,
  onPin,
  onReply,
  onShare,
  onDelete,
  triggerRef,
}: MessageOptionsMenuProps) {
  const iconButtonBase =
    "flex items-center justify-center w-14 h-14 rounded-full transition-colors";

  return (
    <SmartDropdown
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      placement="top-center"
      offset={12}
      className="bg-primary rounded-2xl shadow-lg border border-input-stroke p-[1rem] max-w-[40rem]!"
      closeOnClick={true}
    >
      <div className="flex items-center gap-5">
        <button
          onClick={() => {
            onPin(messageId);
            onClose();
          }}
          className={cn(iconButtonBase, "bg-input-filled hover:bg-gray-200")}
          aria-label="Pin message"
        >
          <Pin size={22} className="text-dark-base-70" />
        </button>

        {onReply && (
          <button
            onClick={() => {
              onReply(messageId);
              onClose();
            }}
            className={cn(iconButtonBase, "bg-input-filled hover:bg-gray-200")}
            aria-label="Reply"
          >
            <MessageSquare size={22} className="text-dark-base-70" />
          </button>
        )}

        {onShare && (
          <button
            onClick={() => {
              onShare(messageId);
              onClose();
            }}
            className={cn(iconButtonBase, "bg-input-filled hover:bg-gray-200")}
            aria-label="Share"
          >
            <Share2 size={22} className="text-dark-base-70" />
          </button>
        )}

        {onDelete && (
          <button
            onClick={() => {
              onDelete(messageId);
              onClose();
            }}
            className={cn(iconButtonBase, "bg-danger-10 hover:bg-danger-5")}
            aria-label="Delete"
          >
            <Trash2 size={22} className="text-danger-100" />
          </button>
        )}
      </div>
    </SmartDropdown>
  );
}
