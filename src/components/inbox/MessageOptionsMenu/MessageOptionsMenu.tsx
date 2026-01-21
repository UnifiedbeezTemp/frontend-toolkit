"use client"

import { Pin, Reply, Share2, Edit, Trash2 } from "lucide-react"
import SmartDropdown from "../../smart-dropdown/SmartDropdown"
import { MessageOptionsMenuProps } from "./types"
import { cn } from "../../../lib/utils"

export default function MessageOptionsMenu({
  isOpen,
  onClose,
  messageId,
  messageText,
  onPin,
  onReply,
  onShare,
  onEdit,
  onDelete,
  triggerRef,
}: MessageOptionsMenuProps) {
  return (
    <SmartDropdown
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      placement="top-center"
      offset={8}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-2"
      closeOnClick={true}
    >
      <div className="flex items-center gap-4 px-2 py-1">
        <button
          onClick={() => {
            onPin(messageId)
            onClose()
          }}
          className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Pin message"
        >
          <Pin size={20} className="text-gray-600" />
        </button>

        {onReply && (
          <button
            onClick={() => {
              onReply(messageId)
              onClose()
            }}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Reply"
          >
            <Reply size={20} className="text-gray-600" />
          </button>
        )}

        {onShare && (
          <button
            onClick={() => {
              onShare(messageId)
              onClose()
            }}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Share"
          >
            <Share2 size={20} className="text-gray-600" />
          </button>
        )}

        {onEdit && (
          <button
            onClick={() => {
              onEdit(messageId)
              onClose()
            }}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Edit"
          >
            <Edit size={20} className="text-gray-600" />
          </button>
        )}

        {onDelete && (
          <button
            onClick={() => {
              onDelete(messageId)
              onClose()
            }}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-red-50 transition-colors"
            aria-label="Delete"
          >
            <Trash2 size={20} className="text-red-600" />
          </button>
        )}
      </div>
    </SmartDropdown>
  )
}
