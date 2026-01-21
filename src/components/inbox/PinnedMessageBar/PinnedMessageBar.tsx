"use client"

import { Pin } from "lucide-react"
import { cn } from "../../../lib/utils"
import Text from "../../ui/Text"

interface PinnedMessageBarProps {
  messageText: string
  onUnpin?: () => void
  className?: string
}

export default function PinnedMessageBar({
  messageText,
  onUnpin,
  className,
}: PinnedMessageBarProps) {
  // Truncate message if too long
  const displayText =
    messageText.length > 60
      ? `${messageText.substring(0, 60)}...`
      : messageText

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-lg border border-gray-200",
        className
      )}
    >
      <Pin size={16} className="text-gray-600 shrink-0" />
      <Text className="text-[1.4rem] text-gray-700 flex-1 truncate">
        {displayText}
      </Text>
    </div>
  )
}
