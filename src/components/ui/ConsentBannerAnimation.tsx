"use client";

import React from "react";
import Player from "lottie-react";
import animationData from "../../animations/Onboarding-Animation-Only-1.json";

interface ConsentBannerAnimationProps {
  className?: string;
  height?: number | string;
}

export default function ConsentBannerAnimation({
  className = "",
  height = 200,
}: ConsentBannerAnimationProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Player
        autoplay
        loop
        animationData={animationData}
        style={{ height, width: "100%" }}
      />
    </div>
  );
}
