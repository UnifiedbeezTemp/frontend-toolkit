import { useCallback, useEffect, useState } from "react";
import {
  DEVTOOLS_DETECTION_THRESHOLD_PX,
  DEVTOOLS_POLL_INTERVAL_MS,
  isDevToolsLikelyOpen,
  isDevToolsShortcut,
} from "./devToolsLock";

export interface UseDevToolsGuardOptions {
  enabled?: boolean;
  lockOnContextMenu?: boolean;
  lockOnKeyboardShortcut?: boolean;
  detectOpenDevTools?: boolean;
  detectionThreshold?: number;
  pollIntervalMs?: number;
  onBlocked?: () => void;
}

interface UseDevToolsGuardResult {
  isInspectionBlocked: boolean;
  resetInspectionBlock: () => void;
}

export default function useDevToolsGuard(
  options: UseDevToolsGuardOptions = {},
): UseDevToolsGuardResult {
  const {
    enabled = true,
    lockOnContextMenu = true,
    lockOnKeyboardShortcut = true,
    detectOpenDevTools = true,
    detectionThreshold = DEVTOOLS_DETECTION_THRESHOLD_PX,
    pollIntervalMs = DEVTOOLS_POLL_INTERVAL_MS,
    onBlocked,
  } = options;

  const [isInspectionBlocked, setIsInspectionBlocked] = useState(false);

  const blockInspection = useCallback((): void => {
    setIsInspectionBlocked((isAlreadyBlocked) => {
      if (!isAlreadyBlocked) {
        onBlocked?.();
      }
      return true;
    });
  }, [onBlocked]);

  const resetInspectionBlock = useCallback((): void => {
    setIsInspectionBlocked(false);
  }, []);

  const evaluateDevToolsState = useCallback((): void => {
    if (typeof window === "undefined" || !detectOpenDevTools) return;

    if (
      isDevToolsLikelyOpen(
        {
          outerWidth: window.outerWidth,
          innerWidth: window.innerWidth,
          outerHeight: window.outerHeight,
          innerHeight: window.innerHeight,
        },
        detectionThreshold,
      )
    ) {
      blockInspection();
    }
  }, [blockInspection, detectOpenDevTools, detectionThreshold]);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const handleContextMenu = (event: MouseEvent): void => {
      if (!lockOnContextMenu) return;
      event.preventDefault();
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (!lockOnKeyboardShortcut || !isDevToolsShortcut(event)) return;
      event.preventDefault();
      event.stopPropagation();
      blockInspection();
    };

    const handleResize = (): void => {
      evaluateDevToolsState();
    };

    if (lockOnContextMenu) {
      window.addEventListener("contextmenu", handleContextMenu);
    }

    if (lockOnKeyboardShortcut) {
      window.addEventListener("keydown", handleKeyDown, true);
    }

    if (detectOpenDevTools) {
      window.addEventListener("resize", handleResize);
    }

    const initialCheckId = detectOpenDevTools
      ? window.setTimeout(evaluateDevToolsState, 0)
      : null;

    const pollId = detectOpenDevTools
      ? window.setInterval(evaluateDevToolsState, pollIntervalMs)
      : null;

    return () => {
      if (lockOnContextMenu) {
        window.removeEventListener("contextmenu", handleContextMenu);
      }

      if (lockOnKeyboardShortcut) {
        window.removeEventListener("keydown", handleKeyDown, true);
      }

      if (detectOpenDevTools) {
        window.removeEventListener("resize", handleResize);
      }

      if (initialCheckId !== null) {
        window.clearTimeout(initialCheckId);
      }

      if (pollId !== null) {
        window.clearInterval(pollId);
      }
    };
  }, [
    blockInspection,
    detectOpenDevTools,
    enabled,
    evaluateDevToolsState,
    lockOnContextMenu,
    lockOnKeyboardShortcut,
    pollIntervalMs,
  ]);

  return {
    isInspectionBlocked,
    resetInspectionBlock,
  };
}
