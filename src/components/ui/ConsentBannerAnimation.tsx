"use client";

import React from "react";
import Player, { LottieRefCurrentProps } from "lottie-react";
import animationData from "../../animations/Onboarding-Animation-Only-1.json";
import { cn } from "../../lib/utils";

interface ConsentBannerAnimationProps {
  className?: string;
  height?: number | string;
  isPaused?: boolean;
}

export default function ConsentBannerAnimation({
  className = "",
  height = "100%",
  isPaused = false,
}: ConsentBannerAnimationProps) {
  const playerRef = React.useRef<LottieRefCurrentProps | null>(null);

  React.useEffect(() => {
    if (!playerRef.current) return;
    if (isPaused) {
      playerRef.current.pause();
    } else {
      playerRef.current.play();
    }
  }, [isPaused]);

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden",
        className,
      )}
    >
      <Player
        lottieRef={playerRef}
        autoplay={!isPaused}
        loop
        animationData={animationData}
        style={{ height, width: "100%", maxWidth: "100%" }}
        className="object-contain"
      />
    </div>
  );
}
