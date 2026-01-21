"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { VolumeControlProps } from "../types";

export default function VolumeControl({
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle,
  className,
}: VolumeControlProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      onVolumeChange(newVolume);
    },
    [onVolumeChange]
  );

  const displayVolume = isMuted ? 0 : volume;

  const getVolumeIcon = () => {
    if (isMuted || displayVolume === 0) {
      return (
        <svg
          className="w-[2rem] h-[2rem] sm:w-[2.2rem] sm:h-[2.2rem]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      );
    }

    if (displayVolume < 0.5) {
      return (
        <svg
          className="w-[2rem] h-[2rem] sm:w-[2.2rem] sm:h-[2.2rem]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 010 7.07" />
        </svg>
      );
    }

    return (
      <svg
        className="w-[2rem] h-[2rem] sm:w-[2.2rem] sm:h-[2.2rem]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
      </svg>
    );
  };

  return (
    <div
      className={cn("relative flex items-center gap-[0.6rem]", className)}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <button
        onClick={onMuteToggle}
        className="p-[0.4rem] text-white hover:text-white/80 transition-colors rounded-[0.4rem] hover:bg-primary/10"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {getVolumeIcon()}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="flex items-center overflow-hidden"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={displayVolume}
              onChange={handleVolumeChange}
              className={cn(
                "w-[6rem] sm:w-[8rem] h-[0.4rem] appearance-none cursor-pointer rounded-full bg-primary/30",
                "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[1.2rem] [&::-webkit-slider-thumb]:h-[1.2rem] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md",
                "[&::-moz-range-thumb]:w-[1.2rem] [&::-moz-range-thumb]:h-[1.2rem] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
              )}
              aria-label="Volume"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
