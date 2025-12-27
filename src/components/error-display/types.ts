import type { ReactNode } from "react"

export interface ErrorDisplayProps {
  message?: string
  title?: string
  onRetry: () => void
  onReportError?: (errorDetails: string) => void | Promise<void>
  onGoToHomepage?: () => void
  className?: string
  showIcon?: boolean
}

export interface ErrorIconProps {
  iconSrc: string
  size?: "sm" | "md"
}

export interface SuccessIconProps {
  iconSrc: string
  size?: "sm" | "md"
}

export interface ErrorContentProps {
  title: string
  message: string
}

export interface ErrorActionsProps {
  onRetry: () => void
  onReportClick?: () => void
  showReportButton: boolean
}

export interface ErrorReportModalProps {
  isOpen: boolean
  onClose: () => void
  errorDetails: string
  onErrorDetailsChange: (value: string) => void
  onSubmit: () => void
  isSubmitting: boolean
  iconSrc: string
}

export interface ErrorReportSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  onGoToHomepage?: () => void
  iconSrc: string
}

export interface ErrorModalLayoutProps {
  isOpen: boolean
  onClose: () => void
  icon: ReactNode
  children: ReactNode
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  modalClassName?: string
}

export interface ModalContentProps {
  title: string
  description?: string
  descriptionClassName?: string
  actions: ReactNode
  children?: ReactNode
}

export interface ModalAction {
  label: string
  onClick: () => void
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  loading?: boolean
  disabled?: boolean
}

export interface ModalActionsProps {
  primaryAction: ModalAction
  secondaryAction?: ModalAction
  className?: string
}
