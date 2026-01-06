"use client"

import { ReactNode } from "react"
import { cn } from "../../lib/utils"

export default function InboxPageLayout({
  leftSideClassNames,
  rightSideClassNames,
  leftSide,
  rightSide,
  containerClassNames,
}: {
  leftSideClassNames?: string
  rightSideClassNames?: string
  leftSide: ReactNode
  rightSide: ReactNode
  containerClassNames?: string
}) {
  return (
    <div
      className={cn(
        "mt-14.25 grid grid-cols-[38%_1fr] xl:grid-cols-[35%_1fr]",
        containerClassNames
      )}
    >
      <div className={cn("", leftSideClassNames)}>{leftSide}</div>
      <div className={cn("", rightSideClassNames)}>{rightSide}</div>
    </div>
  )
}
