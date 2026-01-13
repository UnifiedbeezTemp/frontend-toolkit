import React from "react"
import { cn } from "../../../lib/utils"
import { LinkIcon } from "lucide-react"

export default function LinkPill({ className = "", ...props }) {
  return (
    <a
      className={cn(
        "tagpill text-primary-blue-50 flex items-center w-fit px-4 py-2 rounded-[1rem] gap-2.5",
        className
      )}
      {...props}
    >
      <LinkIcon /> UX Login + Registration
    </a>
  )
}
