"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { VideoControlsProps, PLAYBACK_RATES } from "../types";
import { formatTime } from "../utils/formatTime";
import VideoProgressBar from "./VideoProgressBar";
import VolumeControl from "./VolumeControl";
import ImageComponent from "../../ui/ImageComponent";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";

export default function VideoControls({
  videoState,
  onPlayPause,
  onMuteToggle,
  onVolumeChange,
  onSeek,
  onSkipForward,
  onFullscreenToggle,
  onPiPToggle,
  onPlaybackRateChange,
  onCaptionsToggle,
  enablePiP = true,
  enableFullscreen = true,
  enableCaptions = false,
  enablePlaybackSpeed = true,
  enableSkip = true,
  accentColor = "rgb(0, 178, 169)",
  showCaptions = false,
}: VideoControlsProps) {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const {
    isPlaying,
    currentTime,
    duration,
    buffered,
    volume,
    isMuted,
    playbackRate,
    isFullscreen,
  } = videoState;

  const showHours = duration >= 3600;

  const icons = useSupabaseIcons();

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

      <div className="relative px-[1.2rem] sm:px-[1.6rem] pb-[1rem] sm:pb-[1.4rem] pt-[4rem] sm:pt-[6rem]">
        <VideoProgressBar
          currentTime={currentTime}
          duration={duration}
          buffered={buffered}
          onSeek={onSeek}
          accentColor={accentColor}
          className="mb-[0.8rem] sm:mb-[1.2rem]"
        />

        <div className="flex items-center justify-between gap-[0.8rem] sm:gap-[1.2rem]">
          <div className="flex items-center gap-[0.4rem] sm:gap-[0.8rem]">
            <button
              onClick={onPlayPause}
              className="p-[0.4rem] sm:p-[0.6rem] text-white hover:text-white/80 transition-colors rounded-[0.4rem] hover:bg-primary/10"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <ImageComponent
                  src={icons.playGreen1}
                  alt="play video"
                  width={24}
                  height={24}
                  className="brightness-[10000]"
                />
              ) : (
                <ImageComponent
                  src={icons.playGreen1}
                  alt="play video"
                  width={24}
                  height={24}
                  className="brightness-[10000]"
                />
              )}
            </button>

            {enableSkip && (
              <button
                onClick={onSkipForward}
                className="p-[0.4rem] sm:p-[0.6rem] text-white hover:text-white/80 transition-colors rounded-[0.4rem] hover:bg-primary/10"
                aria-label="Skip forward"
              >
                <svg
                  className="w-[2rem] h-[2rem] sm:w-[2.2rem] sm:h-[2.2rem]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 4 15 12 5 20 5 4" />
                  <line x1="19" y1="5" x2="19" y2="19" />
                </svg>
              </button>
            )}

            <VolumeControl
              volume={volume}
              isMuted={isMuted}
              onVolumeChange={onVolumeChange}
              onMuteToggle={onMuteToggle}
            />

            <div className="text-white text-[1.2rem] sm:text-[1.4rem] font-medium whitespace-nowrap ml-[0.4rem] sm:ml-[0.8rem]">
              {formatTime(currentTime, showHours)} /{" "}
              {formatTime(duration, showHours)}
            </div>
          </div>

          <div className="flex items-center gap-[0.2rem] sm:gap-[0.6rem]">
            {enableCaptions && (
              <button
                onClick={onCaptionsToggle}
                className={cn(
                  "p-[0.4rem] sm:p-[0.6rem] transition-colors rounded-[0.4rem] hover:bg-primary/10",
                  showCaptions ? "text-white" : "text-white/60 hover:text-white"
                )}
                aria-label={showCaptions ? "Hide captions" : "Show captions"}
              >
                <svg
                  className="w-[2rem] h-[2rem] sm:w-[2.2rem] sm:h-[2.2rem]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M7 15h4M15 15h2M7 11h2M13 11h4" />
                </svg>
              </button>
            )}

            {enablePlaybackSpeed && (
              <div className="relative">
                <button
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="p-[0.4rem] sm:p-[0.6rem] text-white hover:text-white/80 transition-colors rounded-[0.4rem] hover:bg-primary/10"
                  aria-label="Playback speed"
                >
                  <svg
                    className="w-[2rem] h-[2rem] sm:w-[2.2rem] sm:h-[2.2rem]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                  </svg>
                </button>

                <AnimatePresence>
                  {showSpeedMenu && (
                    <motion.div
                      className="absolute bottom-full right-0 mb-[0.8rem] bg-black/90 backdrop-blur-sm rounded-[0.8rem] overflow-hidden shadow-lg"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="py-[0.4rem]">
                        {PLAYBACK_RATES.map((rate) => (
                          <button
                            key={rate}
                            onClick={() => {
                              onPlaybackRateChange(rate);
                              setShowSpeedMenu(false);
                            }}
                            className={cn(
                              "w-full px-[1.2rem] py-[0.6rem] text-[1.2rem] sm:text-[1.4rem] text-left hover:bg-primary/10 transition-colors",
                              playbackRate === rate
                                ? "text-white font-medium"
                                : "text-white/70"
                            )}
                          >
                            {rate === 1 ? "Normal" : `${rate}x`}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {enablePiP && (
              <button
                onClick={onPiPToggle}
                className="p-[0.4rem] sm:p-[0.6rem] text-white hover:text-white/80 transition-colors rounded-[0.4rem] hover:bg-primary/10"
                aria-label="Picture in picture"
              >
                <svg
                  className="w-[2rem] h-[2rem] sm:w-[2.2rem] sm:h-[2.2rem]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <rect
                    x="12"
                    y="9"
                    width="8"
                    height="6"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
              </button>
            )}

            {enableFullscreen && (
              <button
                onClick={onFullscreenToggle}
                className="p-[0.4rem] sm:p-[0.6rem] text-white hover:text-white/80 transition-colors rounded-[0.4rem] hover:bg-primary/10"
                aria-label={
                  isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                }
              >
                {isFullscreen ? (
                  <svg
                    className="w-[2rem] h-[2rem] sm:w-[2.2rem] sm:h-[2.2rem]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" />
                  </svg>
                ) : (
                  <svg
                    className="w-[2rem] h-[2rem] sm:w-[2.2rem] sm:h-[2.2rem]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
