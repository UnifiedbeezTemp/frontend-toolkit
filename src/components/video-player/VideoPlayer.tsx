"use client";

import React, { HTMLAttributes, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { VideoPlayerProps } from "./types";
import { useVideoPlayer } from "./hooks/useVideoPlayer";
import VideoControls from "./components/VideoControls";
import PlayButtonOverlay from "./components/PlayButtonOverlay";

/**
 * REUSABLE VIDEO PLAYER COMPONENT
 *
 * A highly flexible, responsive video player with comprehensive controls.
 *
 * USAGE:
 * <VideoPlayer src="/path/to/video.mp4" />
 * <VideoPlayer src="https://example.com/video.mp4" poster="/thumbnail.jpg" />
 * <VideoPlayer src={videoUrl} controls autoPlay muted />
 *
 * PROPS:
 * - src: Video source URL (required)
 * - poster: Thumbnail image URL
 * - autoPlay: Auto-play on mount (default: false)
 * - loop: Loop video (default: false)
 * - muted: Mute by default (default: false)
 * - controls: Show controls (default: true)
 * - aspectRatio: "16/9" | "4/3" | "1/1" | custom (default: "16/9")
 * - rounded: Corner radius (default: "xl")
 * - enablePiP: Enable picture-in-picture (default: true)
 * - enableFullscreen: Enable fullscreen (default: true)
 * - enableCaptions: Enable captions (default: false)
 * - enablePlaybackSpeed: Enable speed control (default: true)
 * - enableSkip: Enable skip buttons (default: true)
 * - skipDuration: Skip duration in seconds (default: 10)
 * - accentColor: Primary color for progress/buttons (default: brand-primary teal)
 * - showPlayOverlay: Show large centered play button (default: true)
 * - hideControlsDelay: Hide controls after N seconds (default: 3)
 * - className: Additional CSS classes
 * - tracks: Caption/subtitle tracks array
 *
 * CALLBACKS:
 * - onPlay, onPause, onEnded, onTimeUpdate, onProgress
 * - onVolumeChange, onError, onFullscreenChange, onLoadedData
 *
 * KEYBOARD SHORTCUTS (when focused):
 * - Space/K: Play/Pause
 * - M: Mute/Unmute
 * - F: Fullscreen
 * - Arrow Left/Right: Skip -/+ 10s
 * - Arrow Up/Down: Volume +/- 10%
 * - 0/Home: Go to start
 * - End: Go to end
 */

const ROUNDED_CLASSES = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

export default function VideoPlayer({
  src,
  poster,
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true,
  width,
  height,
  className,
  aspectRatio = "16/9",
  showPlayOverlay = true,
  enablePiP = true,
  enableFullscreen = true,
  enableCaptions = false,
  enablePlaybackSpeed = true,
  enableSkip = true,
  skipDuration = 10,
  accentColor = "rgb(0, 178, 169)",
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onProgress,
  onVolumeChange,
  onError,
  onFullscreenChange,
  onLoadedData,
  tracks = [],
  rounded = "xl",
  preload = "metadata",
  hideControlsDelay = 3,
  title,
}: VideoPlayerProps) {
  const {
    videoRef,
    containerRef,
    state,
    togglePlayPause,
    toggleMute,
    setVolume,
    seek,
    skipForward,
    skipBackward,
    toggleFullscreen,
    togglePiP,
    setPlaybackRate,
    showControls,
    handlers,
  } = useVideoPlayer({
    autoPlay,
    loop,
    muted,
    skipDuration,
    onPlay,
    onPause,
    onEnded,
    onTimeUpdate,
    onProgress,
    onVolumeChange,
    onError,
    onFullscreenChange,
    onLoadedData,
    hideControlsDelay,
  });

  const [showCaptions, setShowCaptions] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handlePlayPause = useCallback(() => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    togglePlayPause();
  }, [hasStarted, togglePlayPause]);

  const handleCaptionsToggle = useCallback(() => {
    setShowCaptions((prev) => !prev);
    if (videoRef.current) {
      const tracks = videoRef.current.textTracks;
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].mode = showCaptions ? "hidden" : "showing";
      }
    }
  }, [showCaptions, videoRef]);

  const containerStyle: React.CSSProperties = {
    width: width ?? "100%",
    height: height ?? "auto",
    aspectRatio: !height ? aspectRatio : undefined,
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-black group",
        ROUNDED_CLASSES[rounded],
        state.isFullscreen && "rounded-none!",
        className
      )}
      style={containerStyle}
      onMouseMove={showControls}
      onMouseLeave={() => state.isPlaying && setTimeout(() => {}, hideControlsDelay * 1000)}
      tabIndex={0}
      role="region"
      aria-label={title || "Video player"}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        preload={preload}
        playsInline
        className={cn(
          "w-full h-full object-cover",
          ROUNDED_CLASSES[rounded],
          state.isFullscreen && "rounded-none!"
        )}
        {...handlers as unknown as HTMLAttributes<HTMLVideoElement>}
      >
        {tracks.map((track, index) => (
          <track
            key={index}
            kind={track.kind}
            src={track.src}
            srcLang={track.srcLang}
            label={track.label}
            default={track.default}
          />
        ))}
        Your browser does not support the video tag.
      </video>

      <AnimatePresence>
        {state.hasError && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg
              className="w-[4rem] h-[4rem] text-red-500 mb-[1rem]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-white text-[1.4rem] text-center px-[2rem]">
              {state.errorMessage || "An error occurred while playing the video."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {showPlayOverlay && (
        <PlayButtonOverlay
          isPlaying={state.isPlaying && hasStarted}
          isLoading={state.isLoading && hasStarted}
          onClick={handlePlayPause}
          accentColor={accentColor}
        />
      )}

      {title && !state.isPlaying && (
        <div className="absolute top-0 left-0 right-0 z-20 p-[1.2rem] sm:p-[1.6rem]">
          <div className="bg-gradient-to-b from-black/60 to-transparent absolute inset-0" />
          <h3 className="relative text-white text-[1.4rem] sm:text-[1.6rem] font-semibold truncate">
            {title}
          </h3>
        </div>
      )}

      {controls && (
        <AnimatePresence>
          {(state.showControls || !state.isPlaying || state.isPaused) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <VideoControls
                videoState={state}
                onPlayPause={handlePlayPause}
                onMuteToggle={toggleMute}
                onVolumeChange={setVolume}
                onSeek={seek}
                onSkipForward={skipForward}
                onSkipBackward={skipBackward}
                onFullscreenToggle={toggleFullscreen}
                onPiPToggle={togglePiP}
                onPlaybackRateChange={setPlaybackRate}
                onCaptionsToggle={handleCaptionsToggle}
                enablePiP={enablePiP}
                enableFullscreen={enableFullscreen}
                enableCaptions={enableCaptions && tracks.length > 0}
                enablePlaybackSpeed={enablePlaybackSpeed}
                enableSkip={enableSkip}
                accentColor={accentColor}
                showCaptions={showCaptions}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <AnimatePresence>
        {state.isBuffering && state.isPlaying && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/30 z-25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-[4rem] h-[4rem] border-[0.3rem] border-white/20 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {controls && (
        <div
          className="absolute inset-0 z-5"
          onClick={handlePlayPause}
          onDoubleClick={toggleFullscreen}
        />
      )}
    </div>
  );
}

