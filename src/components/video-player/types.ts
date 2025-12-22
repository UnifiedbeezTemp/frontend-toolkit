/**
 * VIDEO PLAYER TYPES
 * 
 * Type definitions for the reusable VideoPlayer component.
 */

export interface VideoPlayerProps {
  /** Video source URL */
  src: string;
  /** Poster/thumbnail image URL */
  poster?: string;
  /** Auto-play the video on mount */
  autoPlay?: boolean;
  /** Loop the video */
  loop?: boolean;
  /** Mute the video by default */
  muted?: boolean;
  /** Show controls */
  controls?: boolean;
  /** Width of the video player */
  width?: string | number;
  /** Height of the video player */
  height?: string | number;
  /** Additional CSS classes */
  className?: string;
  /** Aspect ratio (e.g., "16/9", "4/3", "1/1") */
  aspectRatio?: string;
  /** Show large centered play button overlay */
  showPlayOverlay?: boolean;
  /** Enable picture-in-picture mode */
  enablePiP?: boolean;
  /** Enable fullscreen mode */
  enableFullscreen?: boolean;
  /** Enable closed captions */
  enableCaptions?: boolean;
  /** Enable playback speed control */
  enablePlaybackSpeed?: boolean;
  /** Enable skip forward/backward */
  enableSkip?: boolean;
  /** Skip duration in seconds */
  skipDuration?: number;
  /** Primary accent color */
  accentColor?: string;
  /** Callback when video starts playing */
  onPlay?: () => void;
  /** Callback when video pauses */
  onPause?: () => void;
  /** Callback when video ends */
  onEnded?: () => void;
  /** Callback for time update */
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  /** Callback for progress update */
  onProgress?: (buffered: number) => void;
  /** Callback for volume change */
  onVolumeChange?: (volume: number, muted: boolean) => void;
  /** Callback for errors */
  onError?: (error: Event) => void;
  /** Callback when entering fullscreen */
  onFullscreenChange?: (isFullscreen: boolean) => void;
  /** Callback when video is loaded */
  onLoadedData?: () => void;
  /** Caption/subtitle tracks */
  tracks?: VideoTrack[];
  /** Rounded corners size */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  /** Preload strategy */
  preload?: "none" | "metadata" | "auto";
  /** Control bar position */
  controlsPosition?: "bottom" | "overlay";
  /** Hide controls on inactivity (in seconds) */
  hideControlsDelay?: number;
  /** Custom title to display */
  title?: string;
}

export interface VideoTrack {
  /** Track kind */
  kind: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";
  /** Source URL */
  src: string;
  /** Language code */
  srcLang: string;
  /** Track label */
  label: string;
  /** Is this the default track */
  default?: boolean;
}

export interface VideoState {
  isPlaying: boolean;
  isPaused: boolean;
  isEnded: boolean;
  isLoading: boolean;
  isBuffering: boolean;
  isMuted: boolean;
  isFullscreen: boolean;
  isPiP: boolean;
  currentTime: number;
  duration: number;
  buffered: number;
  volume: number;
  playbackRate: number;
  showControls: boolean;
  hasError: boolean;
  errorMessage: string | null;
}

export interface VideoControlsProps {
  videoState: VideoState;
  onPlayPause: () => void;
  onMuteToggle: () => void;
  onVolumeChange: (volume: number) => void;
  onSeek: (time: number) => void;
  onSkipForward: () => void;
  onSkipBackward: () => void;
  onFullscreenToggle: () => void;
  onPiPToggle: () => void;
  onPlaybackRateChange: (rate: number) => void;
  onCaptionsToggle?: () => void;
  enablePiP?: boolean;
  enableFullscreen?: boolean;
  enableCaptions?: boolean;
  enablePlaybackSpeed?: boolean;
  enableSkip?: boolean;
  skipDuration?: number;
  accentColor?: string;
  showCaptions?: boolean;
}

export interface VideoProgressBarProps {
  currentTime: number;
  duration: number;
  buffered: number;
  onSeek: (time: number) => void;
  accentColor?: string;
  className?: string;
}

export interface PlayButtonOverlayProps {
  isPlaying: boolean;
  isLoading: boolean;
  onClick: () => void;
  accentColor?: string;
}

export interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
  className?: string;
}

export type PlaybackRate = 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2;

export const PLAYBACK_RATES: PlaybackRate[] = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

