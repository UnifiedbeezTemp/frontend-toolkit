"use client";

import dynamic from "next/dynamic";

const PreLoaderAnimation = dynamic(() => import("./PreLoaderAnimation"), {
  ssr: false,
});

interface PreLoaderProps {
  className?: string;
  height?: number;
  isPage?: boolean;
}

export default function PreLoader({
  className = "",
  height = 300,
  isPage = true,
}: PreLoaderProps) {
  return (
    <div
      className={`flex items-center justify-center ${isPage ? "min-h-screen" : ""} ${className}`}
    >
      <PreLoaderAnimation height={height} />
    </div>
  );
}
