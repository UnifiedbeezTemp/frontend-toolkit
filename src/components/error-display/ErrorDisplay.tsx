"use client"

import { motion } from "framer-motion"
import { useSupabaseIcons } from "../../lib/supabase/useSupabase"
import { useErrorDisplay } from "./hooks/useErrorDisplay"
import { ErrorDisplayProps } from "./types"
import { cn } from "../../lib/utils"
import { ErrorIcon } from "./Icons"
import ErrorContent from "./ErrorContent"
import ErrorActions from "./ErrorActions"
import ErrorReportModal from "./ErrorReportModal"
import ErrorReportSuccessModal from "./ErrorReportSuccessModal"

export default function ErrorDisplay({
  message = "Something went wrong. Please try again.",
  title = "Oops! Something went wrong",
  onRetry,
  onReportError,
  className = "",
  showIcon = true,
  onGoToHomepage,
}: ErrorDisplayProps) {
  const { warning, checkMark } = useSupabaseIcons()
  const {
    isReportModalOpen,
    isSuccessModalOpen,
    errorDetails,
    isSubmittingReport,
    setErrorDetails,
    handleOpenReportModal,
    handleCloseReportModal,
    handleCloseSuccessModal,
    handleSubmitReport,
    hasErrorReporting,
  } = useErrorDisplay({ onReportError })

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "border border-border rounded-md flex flex-col items-center justify-center py-8 px-4 md:px-8 text-center bg-primary",
          className
        )}
      >
        {showIcon && (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mb-6"
          >
            <ErrorIcon iconSrc={warning} size="md" />
          </motion.div>
        )}

        <ErrorContent title={title} message={message} />
        <ErrorActions
          onRetry={onRetry}
          onReportClick={handleOpenReportModal}
          showReportButton={hasErrorReporting}
        />
        <button onClick={onGoToHomepage} className="text-brand-primary font-bold text-[1rem] mt-4 mx-auto underline">Return to homepage</button>
      </motion.div>

      {hasErrorReporting && (
        <>
          <ErrorReportModal
            isOpen={isReportModalOpen}
            onClose={handleCloseReportModal}
            errorDetails={errorDetails}
            onErrorDetailsChange={setErrorDetails}
            onSubmit={handleSubmitReport}
            isSubmitting={isSubmittingReport}
            iconSrc={warning}
          />
          <ErrorReportSuccessModal
            isOpen={isSuccessModalOpen}
            onClose={handleCloseSuccessModal}
            onGoToHomepage={onGoToHomepage}
            iconSrc={checkMark}
          />
        </>
      )}
    </>
  )
}
