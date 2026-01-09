import { ReactNode } from "react"
import { cn } from "../../../lib/utils"
import Avatar from "../../ui/Avatar"
import LinkPill from "./LinkPill"

export function GroupIncomingBubble({
  avatar,
  name,
  message,
  className,
  maxWidthClass = "max-w-[38rem]",
}: {
  avatar?: string
  name: string
  message: ReactNode
  timestamp?: string
  className?: string
  maxWidthClass?: string
}) {
  const isColorClass = avatar?.startsWith("bg-")
  const avatarSrc = isColorClass ? undefined : avatar

  return (
    <div className={cn("flex items-start gap-4", className)}>
      <div className="shrink-0">
        {isColorClass ? (
          <div
            className={cn(
              "w-[4rem] h-[4rem] rounded-full flex items-center justify-center text-white font-bold text-[14px]",
              avatar
            )}
          >
            {name.charAt(0).toUpperCase()}
          </div>
        ) : (
          <Avatar alt={name} name={name} src={avatarSrc} />
        )}
      </div>

      <div className={cn("min-w-0 flex flex-col gap-1", maxWidthClass)}>
        <div className="text-base font-bold text-dark-base-100">{name}</div>

        <div className="my-1 whitespace-pre-wrap text-md leading-relaxed text-dark-base-40">
          {message}
          <LinkPill />
        </div>

        <span className="text-xs text-dark-base-50 font-normal">12:57 am</span>
      </div>
    </div>
  )
}
