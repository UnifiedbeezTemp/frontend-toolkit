import React from "react";
import { IconProps } from "./types";

export function ClockIcon({
  size = 16,
  color = "currentColor",
  strokeWidth = 1.33333,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      {...props}
    >
      <circle cx="8" cy="8" r="7" stroke={color} strokeWidth={strokeWidth} />
      <path
        d="M8 4V8L10 10"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ClockIcon;
