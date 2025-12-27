import { useState, useCallback } from "react"

interface UseErrorDisplayProps {
  onReportError?: (errorDetails: string) => void | Promise<void>
}

export function useErrorDisplay({ onReportError }: UseErrorDisplayProps = {}) {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [errorDetails, setErrorDetails] = useState("")
  const [isSubmittingReport, setIsSubmittingReport] = useState(false)

  const handleOpenReportModal = useCallback(() => {
    setIsReportModalOpen(true)
  }, [])

  const handleCloseReportModal = useCallback(() => {
    setIsReportModalOpen(false)
    setErrorDetails("")
  }, [])

  const handleCloseSuccessModal = useCallback(() => {
    setIsSuccessModalOpen(false)
    handleCloseReportModal()
  }, [handleCloseReportModal])

  const handleSubmitReport = useCallback(async () => {
    if (!onReportError) return

    setIsSubmittingReport(true)
    try {
      await onReportError(errorDetails)
      setIsReportModalOpen(false)
      setIsSuccessModalOpen(true)
    } catch (error) {
      console.error("Failed to submit error report:", error)
    } finally {
      setIsSubmittingReport(false)
    }
  }, [onReportError, errorDetails])

  return {
    isReportModalOpen,
    isSuccessModalOpen,
    errorDetails,
    isSubmittingReport,
    setErrorDetails,
    handleOpenReportModal,
    handleCloseReportModal,
    handleCloseSuccessModal,
    handleSubmitReport,
    hasErrorReporting: !!onReportError,
  }
}
