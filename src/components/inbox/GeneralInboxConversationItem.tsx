import { ReactNode } from "react"
import { cn } from "../../lib/utils"
import { TagPill } from "./TagPill"
import { isString } from "../../utils/is"
import Heading from "../ui/Heading"
import Text from "../ui/Text"

export function GeneralInboxConversationItem({
  leading,
  name,
  tag,
  timestamp,
  preview,
  className,
  onClick,
  isActive,
}: {
  onClick?: () => void
  className?: string
  preview?: string
  timestamp?: string
  tag?: string | ReactNode
  name: string
  leading: ReactNode
  isActive?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-full flex items-center gap-4 border-b border-gray-200 px-4 py-3.75 md:pt-1.25 lg:pt-4 text-left hover:bg-input-filled",
        isActive && "bg-input-filled",
        className
      )}
    >
      <div>
        <div className="flex flex-wrap items-center gap-1">
          <div className="w-full sm:w-fit lg:w-full">{leading}</div>
          <Heading className="w-fit text-dark-base-100 text-base">
            {name}
          </Heading>
          <div className="sm:w-full lg:w-auto">
            {isString(tag) ? <TagPill label={tag} /> : tag}
          </div>
        </div>
        <div className="flex justify-between w-full mt-2">
          <Text className="truncate text-md text-gray-250 w-full">
            {preview}
          </Text>
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
