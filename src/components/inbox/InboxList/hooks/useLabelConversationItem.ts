import { useState, useCallback } from "react"

interface UseLabelConversationItemProps {
  controlledExpanded?: boolean
  onToggle?: () => void
}

export const useLabelConversationItem = ({
  controlledExpanded,
  onToggle,
}: UseLabelConversationItemProps = {}) => {
  const [internalExpanded, setInternalExpanded] = useState(false)
  const isExpanded = controlledExpanded ?? internalExpanded

  const handleToggle = useCallback(() => {
    if (onToggle) {
      onToggle()
    } else {
      setInternalExpanded((prev) => !prev)
    }
  }, [onToggle])

  return {
    isExpanded,
    handleToggle,
  }
}
