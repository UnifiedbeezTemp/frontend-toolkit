import { ReactNode, RefObject, useRef } from "react"
import { cn } from "../../../lib/utils"
import IconButton from "../../ui/IconButton"
import { isFunction } from "../../../utils/is"

export type ConversationHeaderAction = {
  key: string
  ariaLabel: string
  icon: ReactNode
  onClick?: (elementRef?: RefObject<HTMLElement | null>) => void
  variant?: "primary" | "secondary"
  disabled?: boolean
  hidden?: boolean
  ref?: RefObject<HTMLElement | null>
}

export function ConversationHeaderActions({
  actions,
  className,
}: {
  actions: ConversationHeaderAction[]
  className?: string
}) {
  const defaultButtonRef = useRef(null)
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {actions
        .filter((a) => !a.hidden)
        .map((a) => {
          const buttonRef = a.ref || defaultButtonRef
          return (
            <IconButton
              key={a.key}
              ref={buttonRef}
              variant={a.variant ?? "secondary"}
              ariaLabel={a.ariaLabel}
              onClick={() => isFunction(a.onClick) && a.onClick(buttonRef)}
              disabled={a.disabled}
              icon={a.icon}
            />
          )
        })}
    </div>
  )
}
