"use client"

import { RefreshCw, File, Image, MessageSquare } from "lucide-react"
import SmartDropdown from "../../smart-dropdown/SmartDropdown"
import { DropdownItem } from "../../smart-dropdown/DropdownItem"
import { FileAttachmentDropdownProps } from "./types"

export default function FileAttachmentDropdown({
  isOpen,
  onClose,
  triggerRef,
  isWhatsApp = false,
  onRefresh,
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
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-2 min-w-[22rem] min-h-[20rem]"
      closeOnClick={true}
    >
      <div className="flex flex-col">
        <DropdownItem
          onClick={() => {
            onRefresh?.()
            onClose()
          }}
          className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg"
        >
          <RefreshCw size={18} className="text-gray-600" />
          <span className="text-[1.4rem] text-gray-700">Refresh chat</span>
        </DropdownItem>

        {isWhatsApp && (
          <DropdownItem
            onClick={() => {
              onWhatsAppTemplate?.()
            }}
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg"
          >
            <MessageSquare size={18} className="text-gray-600" />
            <span className="text-[1.4rem] text-gray-700">WhatsApp Template</span>
          </DropdownItem>
        )}

        <DropdownItem
          onClick={() => {
            onFile?.()
            onClose()
          }}
          className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg"
        >
          <File size={18} className="text-gray-600" />
          <span className="text-[1.4rem] text-gray-700">File</span>
        </DropdownItem>

        <DropdownItem
          onClick={() => {
            onMedia?.()
            onClose()
          }}
          className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg"
        >
          <Image size={18} className="text-gray-600" />
          <span className="text-[1.4rem] text-gray-700">Media</span>
        </DropdownItem>
      </div>
    </SmartDropdown>
  )
}
