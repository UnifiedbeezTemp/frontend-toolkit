"use client";

import { Pin, MessageSquare, Share2, Trash2 } from "lucide-react";
import SmartDropdown from "../../smart-dropdown/SmartDropdown";
import { MessageOptionsMenuProps } from "./types";
import { cn } from "../../../lib/utils";
import IconButton from "../../ui/IconButton";

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
    "bg-input-filled border border-transparent hover:border-input-stroke"

  return (
    <SmartDropdown
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      placement="top-end"
      offset={12}
      className="bg-primary mt-6 rounded-[1.4rem] shadow-lg drop-shadow-sm p-[1rem] max-w-fit!"
      closeOnClick={true}
    >
      <div className="flex items-center gap-2">
        <IconButton
          onClick={() => {
            onPin(messageId);
            onClose();
          }}
          className={cn(iconButtonBase)}
          ariaLabel="Pin message"
          icon={<Pin size={16} fontWeight={700} className="text-dark-base-70" />}
          />

        {onReply && (
          <IconButton
            onClick={() => {
              onReply(messageId);
              onClose();
            }}
            className={cn(iconButtonBase)}
            ariaLabel="Reply"
            icon={<MessageSquare size={16} fontWeight={700} className="text-dark-base-70" />}
/>
        )}

        {onShare && (
          <IconButton
            onClick={() => {
              onShare(messageId);
              onClose();
            }}
            className={cn(iconButtonBase)}
            ariaLabel="Share"
            icon={<Share2 size={16} fontWeight={700} className="text-dark-base-70" />}
          />
        )}

        {onDelete && (
          <IconButton
            onClick={() => {
              onDelete(messageId);
              onClose();
            }}
            className={cn(iconButtonBase, "bg-danger-10 hover:bg-danger-5 hover:border-danger-100!")}
            ariaLabel="Delete"
            icon={<Trash2 size={16} fontWeight={700} className="text-danger-100" />}
          />
        )}
      </div>
    </SmartDropdown>
  );
}
