import { SuccessIcon } from "./Icons"
import ErrorModalLayout from "./ErrorModalLayout"
import ModalContent from "./ModalContent"
import ModalActions from "./ModalActions"
import { ErrorReportSuccessModalProps } from "./types"

export default function ErrorReportSuccessModal({
  isOpen,
  onClose,
  onGoToHomepage,
  iconSrc,
  icon
}: ErrorReportSuccessModalProps) {
  return (
    <ErrorModalLayout
      isOpen={isOpen}
      onClose={onClose}
      icon={iconSrc ? <SuccessIcon iconSrc={iconSrc ?? ""} size="sm" /> : icon}
      showCloseButton={false}
      closeOnOverlayClick={false}
    >
      <ModalContent
        title="Report Submitted Successfully"
        description="Thank you for reporting this error. We've received your feedback and our team will look into it."
        descriptionClassName="mb-6"
        actions={
          <ModalActions
            primaryAction={{
              label: "Close",
              onClick: onClose,
            }}
            secondaryAction={
              onGoToHomepage
                ? {
                    label: "Go to Homepage",
                    onClick: onGoToHomepage,
                  }
                : undefined
            }
          />
        }
      />
    </ErrorModalLayout>
  )
}
