"use client";

import Player from "lottie-react";
import animationData from "../../animations/Preloader.json";

interface PreLoaderProps {
  className?: string;
  height?: number;
  isPage?: boolean
}

export default function PreLoader({ className = "", height = 300, isPage = true }: PreLoaderProps) {
  return (
    <div className={`flex items-center justify-center ${isPage ? "min-h-screen" : ""} ${className}`}>
      <Player
        autoplay
        loop
        animationData={animationData}
        style={{ height }}
      />
    </div>
  );
}

