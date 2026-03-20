import React from "react";
import { IconProps } from "./types";

export default function BoxIcon({
  size = 16,
  color = "var(--dark-base-70)",
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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M14.0026 2H2.0026C1.63441 2 1.33594 2.29848 1.33594 2.66667V4.66667C1.33594 5.03486 1.63441 5.33333 2.0026 5.33333H14.0026C14.3708 5.33333 14.6693 5.03486 14.6693 4.66667V2.66667C14.6693 2.29848 14.3708 2 14.0026 2Z"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.66406 5.3335V12.6668C2.66406 13.0205 2.80454 13.3596 3.05459 13.6096C3.30464 13.8597 3.64377 14.0002 3.9974 14.0002H11.9974C12.351 14.0002 12.6902 13.8597 12.9402 13.6096C13.1903 13.3596 13.3307 13.0205 13.3307 12.6668V5.3335"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66406 8H9.33073"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

