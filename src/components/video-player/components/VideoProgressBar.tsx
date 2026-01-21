"use client";

import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { VideoProgressBarProps } from "../types";
import { formatTime, calculateProgress } from "../utils/formatTime";

export default function VideoProgressBar({
  currentTime,
  duration,
  buffered,
  onSeek,
  accentColor = "rgb(0, 178, 169)",
  className,
}: VideoProgressBarProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);
  const [hoverTime, setHoverTime] = useState(0);

  const progress = calculateProgress(currentTime, duration);
  const bufferedProgress = calculateProgress(
    buffered * (duration / 100),
    duration
  );

  const getTimeFromPosition = useCallback(
    (clientX: number) => {
      if (!progressRef.current || !duration) return 0;
      const rect = progressRef.current.getBoundingClientRect();
      const position = (clientX - rect.left) / rect.width;
      return Math.max(0, Math.min(duration, position * duration));
    },
    [duration]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!progressRef.current) return;
      const rect = progressRef.current.getBoundingClientRect();
      const position = ((e.clientX - rect.left) / rect.width) * 100;
      setHoverPosition(Math.max(0, Math.min(100, position)));
      setHoverTime(getTimeFromPosition(e.clientX));
    },
    [getTimeFromPosition]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isDragging) {
      setHoverPosition(null);
    }
  }, [isDragging]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const time = getTimeFromPosition(e.clientX);
      onSeek(time);
    },
    [getTimeFromPosition, onSeek]
  );

  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      setIsDragging(true);
      e.preventDefault();

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const time = getTimeFromPosition(clientX);
      onSeek(time);
    },
    [getTimeFromPosition, onSeek]
  );

  const handleDrag = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const time = getTimeFromPosition(clientX);
      onSeek(time);
    },
    [isDragging, getTimeFromPosition, onSeek]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setHoverPosition(null);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("mouseup", handleDragEnd);
      document.addEventListener("touchmove", handleDrag);
      document.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDrag);
      document.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleDrag, handleDragEnd]);

  return (
    <div className={cn("relative w-full group", className)}>
      {hoverPosition !== null && (
        <div
          className="absolute bottom-[1.6rem] transform -translate-x-1/2 bg-black/90 text-white text-[1.1rem] px-[0.6rem] py-[0.3rem] rounded-[0.4rem] pointer-events-none z-10 font-medium"
          style={{ left: `${hoverPosition}%` }}
        >
          {formatTime(hoverTime)}
        </div>
      )}

      <div
        ref={progressRef}
        className="relative h-[0.4rem] bg-primary/30 rounded-full cursor-pointer group-hover:h-[0.6rem] transition-all duration-150"
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        role="slider"
        aria-label="Video progress"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={currentTime}
        tabIndex={0}
      >
        <div
          className="absolute inset-y-0 left-0 bg-primary/40 rounded-full"
          style={{ width: `${bufferedProgress}%` }}
        />

        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            backgroundColor: accentColor,
            width: `${progress}%`,
          }}
          initial={false}
          transition={{ duration: isDragging ? 0 : 0.1 }}
        />

        {hoverPosition !== null && (
          <div
            className="absolute inset-y-0 w-[0.2rem] bg-primary/60 pointer-events-none"
            style={{ left: `${hoverPosition}%`, transform: "translateX(-50%)" }}
          />
        )}

        <motion.div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 w-[1.2rem] h-[1.2rem] rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing",
            isDragging && "opacity-100"
          )}
          style={{
            left: `${progress}%`,
            transform: "translate(-50%, -50%)",
            backgroundColor: accentColor,
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
        />
      </div>
    </div>
  );
}
