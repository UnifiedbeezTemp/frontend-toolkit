import { useRef, useCallback } from "react"

interface UseLongPressOptions {
  onLongPress: (e: React.MouseEvent | React.TouchEvent) => void
  onClick?: (e: React.MouseEvent | React.TouchEvent) => void
  delay?: number
}

export function useLongPress({
  onLongPress,
  onClick,
  delay = 500,
}: UseLongPressOptions) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const targetRef = useRef<HTMLElement | null>(null)

  const start = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (e.currentTarget instanceof HTMLElement) {
        targetRef.current = e.currentTarget
      }
      timeoutRef.current = setTimeout(() => {
        onLongPress(e)
      }, delay)
    },
    [onLongPress, delay]
  )

  const clear = useCallback(
    (e: React.MouseEvent | React.TouchEvent, shouldTriggerClick = false) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (shouldTriggerClick && onClick) {
        onClick(e)
      }
    },
    [onClick]
  )

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: (e: React.MouseEvent) => clear(e, true),
    onMouseLeave: (e: React.MouseEvent) => clear(e, false),
    onTouchEnd: (e: React.TouchEvent) => clear(e, true),
    onTouchCancel: (e: React.TouchEvent) => clear(e, false),
  }
}
