import { ReactNode } from "react"

export interface CelebrationModalProps {
  isOpen: boolean
  onClose: () => void
  onContinue: () => void
  onGoBack: () => void
  heading: ReactNode
  backBtnText?: ReactNode
  continueBtnText?: ReactNode
}