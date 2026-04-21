import { useCallback, useEffect } from "react"
import { INLINE_FEEDBACK_TIMEOUT_MS } from "../types/teamManagement"

interface UseInlineFeedbackDismissParams {
  enabled: boolean
  onClear: () => void
}

export const useInlineFeedbackDismiss = ({
  enabled,
  onClear,
}: UseInlineFeedbackDismissParams) => {
  useEffect(() => {
    if (!enabled) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      onClear()
    }, INLINE_FEEDBACK_TIMEOUT_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [enabled, onClear])

  const handleInteraction = useCallback(() => {
    if (!enabled) {
      return
    }

    onClear()
  }, [enabled, onClear])

  return {
    onPointerDownCapture: enabled ? handleInteraction : undefined,
    onKeyDownCapture: enabled ? handleInteraction : undefined,
  }
}
