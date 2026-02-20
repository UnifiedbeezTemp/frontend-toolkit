"use client";

import React from "react";
import Player from "lottie-react";
import animationData from "../../animations/Onboarding-Animation-Only-1.json";
import { cn } from "../../lib/utils";

interface ConsentBannerAnimationProps {
  className?: string;
  height?: number | string;
}

export default function ConsentBannerAnimation({
  className = "",
  height = "100%",
}: ConsentBannerAnimationProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden",
        className,
      )}
    >
      <Player
        autoplay
        loop
        animationData={animationData}
        style={{ height, width: "100%", maxWidth: "100%" }}
        className="object-contain"
      />
    </div>
  );
}
