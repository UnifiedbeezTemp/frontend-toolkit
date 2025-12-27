import Textarea from "../ui/Textarea"
import { ErrorIcon } from "./Icons"
import ErrorModalLayout from "./ErrorModalLayout"
import ModalContent from "./ModalContent"
import ModalActions from "./ModalActions"
import { ErrorReportModalProps } from "./types"

export default function ErrorReportModal({
  isOpen,
  onClose,
  errorDetails,
  onErrorDetailsChange,
  onSubmit,
  isSubmitting,
  iconSrc,
}: ErrorReportModalProps) {
  return (
    <ErrorModalLayout
      isOpen={isOpen}
      onClose={onClose}
      icon={<ErrorIcon iconSrc={iconSrc} size="sm" />}
      closeOnOverlayClick={true}
    >
      <ModalContent
        title="Report Error"
        description="Help us improve by reporting this error. Please provide any additional details about what you were trying to do."
        actions={
          <ModalActions
            primaryAction={{
              label: "Submit Report",
              onClick: onSubmit,
              loading: isSubmitting,
              disabled: isSubmitting,
            }}
            secondaryAction={{
              label: "Cancel",
              onClick: onClose,
              disabled: isSubmitting,
            }}
            className="mt-6"
          />
        }
      >
        <div className="mb-6">
          <Textarea
            value={errorDetails}
            onChange={(e) => onErrorDetailsChange(e.target.value)}
            placeholder="Describe what happened or what you were trying to do..."
            rows={4}
            className="w-full"
          />
        </div>
      </ModalContent>
    </ErrorModalLayout>
  )
}
