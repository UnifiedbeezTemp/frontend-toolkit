import Button from "../ui/Button"
import { ErrorActionsProps } from "./types"

export default function ErrorActions({
  onRetry,
  onReportClick,
  showReportButton,
}: ErrorActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-80">
      {showReportButton && (
        <Button
          variant="secondary"
          onClick={onReportClick}
          className="shrink-0 grow basis-1/2"
        >
          Report Error
        </Button>
      )}
      <Button
        variant="primary"
        onClick={onRetry}
        className="shrink-0 grow basis-1/2"
      >
        Retry
      </Button>
    </div>
  )
}
