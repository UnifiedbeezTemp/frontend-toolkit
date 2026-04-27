"use client";

import { RefreshCw, File, Image, MessageSquare } from "lucide-react";
import SmartDropdown from "../../smart-dropdown/SmartDropdown";
import { DropdownItem } from "../../smart-dropdown/DropdownItem";
import { FileAttachmentDropdownProps } from "./types";
import { cn } from "../../../lib/utils";

export default function FileAttachmentDropdown({
  isOpen,
  onClose,
  triggerRef,
  isWhatsApp = false,
  onRefresh,
  isRefreshing = false,
  onFile,
  onMedia,
  onWhatsAppTemplate,
}: FileAttachmentDropdownProps) {
  return (
    <SmartDropdown
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      placement="top-start"
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-2 min-w-[22rem]"
      closeOnClick={!isRefreshing}
    >
      <div className="flex flex-col">
        <DropdownItem
          onClick={() => {
            if (!isRefreshing) {
              onRefresh?.();
            }
          }}
          disabled={isRefreshing}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors",
            isRefreshing && "cursor-default opacity-80",
          )}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <RefreshCw
              size={18}
              className={cn("text-text-primary", isRefreshing && "animate-spin transition-all")}
            />
          </div>
          <span className="text-[1.4rem] text-text-primary">
            {isRefreshing ? "Refreshing..." : "Refresh chat"}
          </span>
        </DropdownItem>

        {/* <div className="h-px bg-gray-100 my-1 mx-2" /> */}

        {/* {isWhatsApp && (
          <DropdownItem
            onClick={() => {
              onWhatsAppTemplate?.();
              onClose();
            }}
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg"
          >
            <MessageSquare size={18} className="text-text-primary" />
            <span className="text-[1.4rem] text-text-primary">
              WhatsApp Template
            </span>
          </DropdownItem>
        )} */}

        {/* <DropdownItem
          onClick={() => {
            onFile?.();
            onClose();
          }}
          className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg"
        >
          <File size={18} className="text-text-primary" />
          <span className="text-[1.4rem] text-text-primary">File</span>
        </DropdownItem>

        <DropdownItem
          onClick={() => {
            onMedia?.();
            onClose();
          }}
          className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg"
        >
          <Image size={18} className="text-text-primary" />
          <span className="text-[1.4rem] text-text-primary">Media</span>
        </DropdownItem> */}
      </div>
    </SmartDropdown>
  );
}
