import Button from "../ui/Button"
import { cn } from "../../lib/utils"
import { ModalActionsProps } from "./types"

export default function ModalActions({
  primaryAction,
  secondaryAction,
  className,
}: ModalActionsProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row gap-3", className)}>
      {secondaryAction && (
        <Button
          variant={secondaryAction.variant || "secondary"}
          onClick={secondaryAction.onClick}
          loading={secondaryAction.loading}
          disabled={secondaryAction.disabled}
          className="shrink-0 grow basis-1/2"
        >
          {secondaryAction.label}
        </Button>
      )}
      <Button
        variant={primaryAction.variant || "primary"}
        onClick={primaryAction.onClick}
        loading={primaryAction.loading}
        disabled={primaryAction.disabled}
        className={cn(
          "shrink-0",
          secondaryAction ? "grow basis-1/2" : "w-full"
        )}
      >
        {primaryAction.label}
      </Button>
    </div>
  )
}
