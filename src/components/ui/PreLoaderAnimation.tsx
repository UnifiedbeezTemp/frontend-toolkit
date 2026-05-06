"use client";

import Player from "lottie-react";
import animationData from "../../animations/Preloader.json";

interface PreLoaderAnimationProps {
  height: number;
}

export default function PreLoaderAnimation({ height }: PreLoaderAnimationProps) {
  return (
    <Player
      autoplay
      loop
      animationData={{
        ...animationData,
        layers: animationData.layers.filter(
          (layer) => layer.nm !== "Rectangle 1",
        ),
      }}
      style={{ height }}
    />
  );
}
