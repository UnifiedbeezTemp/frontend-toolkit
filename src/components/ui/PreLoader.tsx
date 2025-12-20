"use client";

import Player from "lottie-react";
import animationData from "../../animations/Preloader.json";

interface PreLoaderProps {
  className?: string;
  height?: number;
}

export default function PreLoader({ className = "", height = 300 }: PreLoaderProps) {
  return (
    <div className={`min-h-screen flex items-center justify-center ${className}`}>
      <Player
        autoplay
        loop
        animationData={animationData}
        style={{ height }}
      />
    </div>
  );
}

