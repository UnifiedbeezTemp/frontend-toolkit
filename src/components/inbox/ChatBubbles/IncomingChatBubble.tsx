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
    <div>
      <div
        className={cn(
          "rounded-bl-none! flex items-start gap-4 bg-input-filled px-4 py-2 rounded-[1.4rem]",
          className,
        )}
      >
        <div className={cn("min-w-0 flex flex-col gap-1", maxWidthClass)}>
          <div className="my-1 whitespace-pre-wrap text-md lg:text-base leading-relaxed text-dark-base-40">
            {children}
          </div>
        </div>
      </div>
      <span className="text-sm text-dark-base-50 font-normal">12:57 am</span>
    </div>
  )
}
