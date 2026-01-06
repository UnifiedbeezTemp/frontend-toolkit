
import { ReactNode } from "react"
import { cn } from "../../../lib/utils"
import IconButton from "../../ui/IconButton"

export type ConversationHeaderAction = {
  key: string
  ariaLabel: string
  icon: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary"
  disabled?: boolean
  hidden?: boolean
}

export function ConversationHeaderActions({
  actions,
  className,
}: {
  actions: ConversationHeaderAction[]
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {actions
        .filter((a) => !a.hidden)
        .map((a) => (
          <IconButton
            key={a.key}
            variant={a.variant ?? "secondary"}
            ariaLabel={a.ariaLabel}
            onClick={a.onClick}
            disabled={a.disabled}
            icon={a.icon}
          />
        ))}
    </div>
  )
}
