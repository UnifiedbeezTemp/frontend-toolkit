import { ReactNode } from "react"
import { cn } from "../../../lib/utils"


export function IncomingChatBubble({
  children,
  className,
  maxWidthClass = "max-w-[38rem]",
}: {
  children: ReactNode
  className?: string
  maxWidthClass?: string
}) {
  return (
    <div
      className={cn(
        "flex gap-2 flex-col w-full justify-end items-start",
        className
      )}
    >
      <div
        className={cn(
          "text-md rounded-[1.6rem] rounded-bl-none bg-input-filled p-4",
          "text-dark-base-70 shadow-sm",
          maxWidthClass
        )}
      >
        {children}
      </div>
      <span className="text-xs text-dark-base-50 font-normal">12:57 am</span>
    </div>
  )
}
