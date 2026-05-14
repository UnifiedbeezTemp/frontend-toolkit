export const DEVTOOLS_DETECTION_THRESHOLD_PX = 160;
export const DEVTOOLS_POLL_INTERVAL_MS = 1_000;

export interface ViewportMetrics {
  outerWidth: number;
  innerWidth: number;
  outerHeight: number;
  innerHeight: number;
}

interface KeyboardShortcutState {
  key: string;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  metaKey: boolean;
}

export function isDevToolsShortcut(event: KeyboardShortcutState): boolean {
  const key = event.key.toLowerCase();

  if (key === "f12") return true;

  const commandOrControlPressed = event.ctrlKey || event.metaKey;
  const opensInspector =
    key === "i" || // Elements / Inspector
    key === "j" || // Console
    key === "c"; // Element picker

  const withControlShift = commandOrControlPressed && event.shiftKey;
  const withCommandOption = event.metaKey && event.altKey;

  if (opensInspector && (withControlShift || withCommandOption)) {
    return true;
  }

  return commandOrControlPressed && key === "u";
}

export function isDevToolsLikelyOpen(
  viewport: ViewportMetrics,
  threshold = DEVTOOLS_DETECTION_THRESHOLD_PX,
): boolean {
  const widthGap = Math.abs(viewport.outerWidth - viewport.innerWidth);
  const heightGap = Math.abs(viewport.outerHeight - viewport.innerHeight);

  return widthGap > threshold || heightGap > threshold;
}
