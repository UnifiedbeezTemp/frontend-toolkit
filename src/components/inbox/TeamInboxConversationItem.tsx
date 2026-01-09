import { ReactNode } from "react"
import { cn } from "../../lib/utils"
import Heading from "../ui/Heading"
import Text from "../ui/Text"
import { AvatarGroup } from "../avatar/AvatarGroup"

export function TeamInboxConversationItem({
  leading,
  name,
  timestamp,
  preview,
  unreadCount = 0,
  className,
  onClick,
  isActive,
  isGroup = false,
  participants = [],
  participantAvatars = [],
}: {
  onClick?: () => void
  className?: string
  unreadCount?: number
  preview?: string
  timestamp?: string
  name: string
  leading: ReactNode
  isActive?: boolean
  isGroup?: boolean
  participants?: string[]
  participantAvatars?: string[]
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-full flex items-center gap-4 border-b border-gray-200 px-4 py-3.75 md:px-2 lg:px-4 text-left hover:bg-input-filled",
        isActive && "bg-input-filled",
        className
      )}
    >
      <div className="w-full">
        <div className="flex flex-wrap items-center gap-1">
          <div className="w-full sm:w-fit lg:w-full">
            {isGroup && participants.length > 0 ? (
              <AvatarGroup
                items={participants.slice(0, 3).map((participant, idx) => {
                  // Use participantAvatars if available, otherwise fallback to initials
                  const avatarUrl = participantAvatars[idx]
                  return avatarUrl
                    ? {
                        id: `participant-${idx}`,
                        type: "image" as const,
                        src: avatarUrl,
                        alt: participant,
                      }
                    : {
                        id: `participant-${idx}`,
                        type: "initial" as const,
                        label: participant.charAt(0).toUpperCase(),
                        bgColor: `hsl(${(idx * 137.5) % 360}, 70%, 50%)`,
                        textColor: "#fff",
                      }
                })}
                size={40}
                overlapDirection="left"
              />
            ) : (
              leading
            )}
          </div>
          <div className="flex items-center gap-2">
            <Heading className="w-fit text-dark-base-100 text-base">
              {name}
            </Heading>
            {isGroup && (
              <span className="text-xs text-gray-250">
                {participants.length} members
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-between w-full mt-2">
          <Text className="truncate text-md text-gray-250 w-full">
            {preview}
          </Text>
          <div>
            {unreadCount > 0 ? (
              <span className="text-center grid h-5 w-5 place-items-center rounded-full bg-danger-100 text-xs font-semibold text-white">
                {unreadCount}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <div
        className="absolute sm:hidden lg:block
       top-3.75 md:top-1.25 lg:top-4 right-4 text-xs text-gray-250"
      >
        {timestamp}
      </div>
    </button>
  )
}
