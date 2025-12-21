"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { VideoState, VideoPlayerProps } from "../types";
import { getBufferedPercentage, clamp } from "../utils/formatTime";

interface UseVideoPlayerProps
  extends Pick<
    VideoPlayerProps,
    | "autoPlay"
    | "loop"
    | "muted"
    | "skipDuration"
    | "onPlay"
    | "onPause"
    | "onEnded"
    | "onTimeUpdate"
    | "onProgress"
    | "onVolumeChange"
    | "onError"
    | "onFullscreenChange"
    | "onLoadedData"
    | "hideControlsDelay"
  > {}

const initialState: VideoState = {
  isPlaying: false,
  isPaused: true,
  isEnded: false,
  isLoading: true,
  isBuffering: false,
  isMuted: false,
  isFullscreen: false,
  isPiP: false,
  currentTime: 0,
  duration: 0,
  buffered: 0,
  volume: 1,
  playbackRate: 1,
  showControls: true,
  hasError: false,
  errorMessage: null,
};

export function useVideoPlayer(props: UseVideoPlayerProps = {}) {
  const {
    autoPlay = false,
    loop = false,
    muted = false,
    skipDuration = 10,
    onPlay,
    onPause,
    onEnded,
    onTimeUpdate,
    onProgress,
    onVolumeChange: onVolumeChangeCallback,
    onError,
    onFullscreenChange,
    onLoadedData,
    hideControlsDelay = 3,
  } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [state, setState] = useState<VideoState>({
    ...initialState,
    isMuted: muted,
  });

  // Update state helper
  const updateState = useCallback((updates: Partial<VideoState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  // Play/Pause
  const play = useCallback(async () => {
    if (!videoRef.current) return;
    try {
      await videoRef.current.play();
      updateState({ isPlaying: true, isPaused: false, isEnded: false });
      onPlay?.();
    } catch (error) {
      console.error("Error playing video:", error);
    }
  }, [onPlay, updateState]);

  const pause = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    updateState({ isPlaying: false, isPaused: true });
    onPause?.();
  }, [onPause, updateState]);

  const togglePlayPause = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  // Mute/Unmute
  const mute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = true;
    updateState({ isMuted: true });
    onVolumeChangeCallback?.(state.volume, true);
  }, [onVolumeChangeCallback, state.volume, updateState]);

  const unmute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    updateState({ isMuted: false });
    onVolumeChangeCallback?.(state.volume, false);
  }, [onVolumeChangeCallback, state.volume, updateState]);

  const toggleMute = useCallback(() => {
    if (state.isMuted) {
      unmute();
    } else {
      mute();
    }
  }, [state.isMuted, mute, unmute]);

  // Volume
  const setVolume = useCallback(
    (volume: number) => {
      if (!videoRef.current) return;
      const clampedVolume = clamp(volume, 0, 1);
      videoRef.current.volume = clampedVolume;
      updateState({ volume: clampedVolume, isMuted: clampedVolume === 0 });
      onVolumeChangeCallback?.(clampedVolume, clampedVolume === 0);
    },
    [onVolumeChangeCallback, updateState]
  );

  // Seek
  const seek = useCallback(
    (time: number) => {
      if (!videoRef.current) return;
      const clampedTime = clamp(time, 0, state.duration);
      videoRef.current.currentTime = clampedTime;
      updateState({ currentTime: clampedTime });
    },
    [state.duration, updateState]
  );

  const seekByPercentage = useCallback(
    (percentage: number) => {
      const time = (percentage / 100) * state.duration;
      seek(time);
    },
    [seek, state.duration]
  );

  // Skip forward/backward
  const skipForward = useCallback(() => {
    seek(state.currentTime + skipDuration);
  }, [seek, skipDuration, state.currentTime]);

  const skipBackward = useCallback(() => {
    seek(state.currentTime - skipDuration);
  }, [seek, skipDuration, state.currentTime]);

  // Playback rate
  const setPlaybackRate = useCallback(
    (rate: number) => {
      if (!videoRef.current) return;
      videoRef.current.playbackRate = rate;
      updateState({ playbackRate: rate });
    },
    [updateState]
  );

  // Fullscreen
  const enterFullscreen = useCallback(async () => {
    if (!containerRef.current) return;
    try {
      if (containerRef.current.requestFullscreen) {
        await containerRef.current.requestFullscreen();
      } else if ((containerRef.current as unknown as { webkitRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen) {
        await (containerRef.current as unknown as { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen();
      }
      updateState({ isFullscreen: true });
      onFullscreenChange?.(true);
    } catch (error) {
      console.error("Error entering fullscreen:", error);
    }
  }, [onFullscreenChange, updateState]);

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as unknown as { webkitExitFullscreen?: () => Promise<void> }).webkitExitFullscreen) {
        await (document as unknown as { webkitExitFullscreen: () => Promise<void> }).webkitExitFullscreen();
      }
      updateState({ isFullscreen: false });
      onFullscreenChange?.(false);
    } catch (error) {
      console.error("Error exiting fullscreen:", error);
    }
  }, [onFullscreenChange, updateState]);

  const toggleFullscreen = useCallback(() => {
    if (state.isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }, [state.isFullscreen, enterFullscreen, exitFullscreen]);

  // Picture-in-Picture
  const enterPiP = useCallback(async () => {
    if (!videoRef.current || !document.pictureInPictureEnabled) return;
    try {
      await videoRef.current.requestPictureInPicture();
      updateState({ isPiP: true });
    } catch (error) {
      console.error("Error entering PiP:", error);
    }
  }, [updateState]);

  const exitPiP = useCallback(async () => {
    if (!document.pictureInPictureElement) return;
    try {
      await document.exitPictureInPicture();
      updateState({ isPiP: false });
    } catch (error) {
      console.error("Error exiting PiP:", error);
    }
  }, [updateState]);

  const togglePiP = useCallback(() => {
    if (state.isPiP) {
      exitPiP();
    } else {
      enterPiP();
    }
  }, [state.isPiP, enterPiP, exitPiP]);

  // Controls visibility
  const showControls = useCallback(() => {
    updateState({ showControls: true });

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    if (state.isPlaying && hideControlsDelay > 0) {
      controlsTimeoutRef.current = setTimeout(() => {
        updateState({ showControls: false });
      }, hideControlsDelay * 1000);
    }
  }, [hideControlsDelay, state.isPlaying, updateState]);

  const hideControls = useCallback(() => {
    if (state.isPlaying) {
      updateState({ showControls: false });
    }
  }, [state.isPlaying, updateState]);

  // Event handlers
  const handleLoadedMetadata = useCallback(() => {
    if (!videoRef.current) return;
    updateState({
      duration: videoRef.current.duration,
      isLoading: false,
    });
    onLoadedData?.();
  }, [onLoadedData, updateState]);

  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;
    const currentTime = videoRef.current.currentTime;
    updateState({ currentTime });
    onTimeUpdate?.(currentTime, state.duration);
  }, [onTimeUpdate, state.duration, updateState]);

  const handleProgress = useCallback(() => {
    if (!videoRef.current) return;
    const buffered = getBufferedPercentage(
      videoRef.current.buffered,
      state.duration
    );
    updateState({ buffered });
    onProgress?.(buffered);
  }, [onProgress, state.duration, updateState]);

  const handleEnded = useCallback(() => {
    updateState({ isPlaying: false, isPaused: true, isEnded: true });
    onEnded?.();

    if (loop && videoRef.current) {
      videoRef.current.currentTime = 0;
      play();
    }
  }, [loop, onEnded, play, updateState]);

  const handleError = useCallback(
    (e: Event) => {
      const videoElement = e.target as HTMLVideoElement;
      const error = videoElement.error;
      let errorMessage = "An error occurred while playing the video.";

      if (error) {
        switch (error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            errorMessage = "Video playback was aborted.";
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            errorMessage = "A network error occurred.";
            break;
          case MediaError.MEDIA_ERR_DECODE:
            errorMessage = "Video decoding failed.";
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = "Video format not supported.";
            break;
        }
      }

      updateState({
        hasError: true,
        errorMessage,
        isLoading: false,
      });
      onError?.(e);
    },
    [onError, updateState]
  );

  const handleWaiting = useCallback(() => {
    updateState({ isBuffering: true });
  }, [updateState]);

  const handleCanPlay = useCallback(() => {
    updateState({ isBuffering: false, isLoading: false });
  }, [updateState]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;

      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlayPause();
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "ArrowRight":
          e.preventDefault();
          skipForward();
          break;
        case "ArrowLeft":
          e.preventDefault();
          skipBackward();
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume(state.volume + 0.1);
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume(state.volume - 0.1);
          break;
        case "0":
        case "Home":
          e.preventDefault();
          seek(0);
          break;
        case "End":
          e.preventDefault();
          seek(state.duration);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    togglePlayPause,
    toggleMute,
    toggleFullscreen,
    skipForward,
    skipBackward,
    setVolume,
    seek,
    state.volume,
    state.duration,
  ]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      updateState({ isFullscreen });
      onFullscreenChange?.(isFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
    };
  }, [onFullscreenChange, updateState]);

  // PiP change listener
  useEffect(() => {
    const handlePiPEnter = () => updateState({ isPiP: true });
    const handlePiPLeave = () => updateState({ isPiP: false });

    const video = videoRef.current;
    if (video) {
      video.addEventListener("enterpictureinpicture", handlePiPEnter);
      video.addEventListener("leavepictureinpicture", handlePiPLeave);
    }

    return () => {
      if (video) {
        video.removeEventListener("enterpictureinpicture", handlePiPEnter);
        video.removeEventListener("leavepictureinpicture", handlePiPLeave);
      }
    };
  }, [updateState]);

  // Auto-play
  useEffect(() => {
    if (autoPlay && videoRef.current) {
      play();
    }
  }, [autoPlay, play]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return {
    // Refs
    videoRef,
    containerRef,
    // State
    state,
    // Playback controls
    play,
    pause,
    togglePlayPause,
    // Volume controls
    mute,
    unmute,
    toggleMute,
    setVolume,
    // Seek controls
    seek,
    seekByPercentage,
    skipForward,
    skipBackward,
    // Playback rate
    setPlaybackRate,
    // Fullscreen
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
    // Picture-in-Picture
    enterPiP,
    exitPiP,
    togglePiP,
    // Controls visibility
    showControls,
    hideControls,
    // Event handlers (for binding to video element)
    handlers: {
      onLoadedMetadata: handleLoadedMetadata,
      onTimeUpdate: handleTimeUpdate,
      onProgress: handleProgress,
      onEnded: handleEnded,
      onError: handleError,
      onWaiting: handleWaiting,
      onCanPlay: handleCanPlay,
      onPlay: () => updateState({ isPlaying: true, isPaused: false }),
      onPause: () => updateState({ isPlaying: false, isPaused: true }),
    },
  };
}

