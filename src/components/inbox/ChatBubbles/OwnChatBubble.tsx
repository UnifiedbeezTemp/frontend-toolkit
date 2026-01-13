

import { ReactNode } from "react"
import { cn } from "../../../lib/utils"

export function OwnChatBubble({
  children,
  className,
  maxWidthClass = "max-w-[38rem]",
}: {
  children: ReactNode
  className?: string
  maxWidthClass?: string
}) {
  return (
    <div className={cn("flex gap-2 flex-col w-full justify-end items-end", className)}>
      <div
        className={cn(
          "rounded-[1.6rem] rounded-br-none p-4",
          "text-md text-primary",
          "bg-[linear-gradient(143deg,var(--brand-primary)_21.47%,var(--yellow-100)_289.64%)]",
          maxWidthClass
        )}
      >
        {children}
      </div>
      <span className="text-xs text-dark-base-50 font-normal">12:57 am</span>
    </div>
  )
}
