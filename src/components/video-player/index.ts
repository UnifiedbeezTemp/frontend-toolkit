/**
 * VIDEO PLAYER COMPONENT EXPORTS
 *
 * Main component and all related types, hooks, and utilities.
 */

// Main component
export { default as VideoPlayer } from "./VideoPlayer";

// Sub-components (for custom implementations)
export { default as VideoControls } from "./components/VideoControls";
export { default as VideoProgressBar } from "./components/VideoProgressBar";
export { default as PlayButtonOverlay } from "./components/PlayButtonOverlay";
export { default as VolumeControl } from "./components/VolumeControl";

// Hook
export { useVideoPlayer } from "./hooks/useVideoPlayer";

// Types
export type {
  VideoPlayerProps,
  VideoState,
  VideoTrack,
  VideoControlsProps,
  VideoProgressBarProps,
  PlayButtonOverlayProps,
  VolumeControlProps,
  PlaybackRate,
} from "./types";

export { PLAYBACK_RATES } from "./types";

// Utilities
export {
  formatTime,
  parseTime,
  calculateProgress,
  clamp,
  formatTimeDisplay,
  getBufferedPercentage,
} from "./utils/formatTime";

