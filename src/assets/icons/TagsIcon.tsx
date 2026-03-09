import React from "react";
import { IconProps } from "./types";

export default function TagsIcon({
  size = 24,
  color = "currentColor",
  className,
  isActive,
  ...props
}: IconProps) {
  const iconColor = isActive ? "var(--brand-primary)" : color;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M3 8V12.172C3.00011 12.7024 3.2109 13.211 3.586 13.586L9.296 19.296C9.74795 19.7479 10.3609 20.0017 11 20.0017C11.6391 20.0017 12.252 19.7479 12.704 19.296L16.296 15.704C16.7479 15.252 17.0017 14.6391 17.0017 14C17.0017 13.3609 16.7479 12.748 16.296 12.296L10.586 6.586C10.211 6.2109 9.70239 6.00011 9.172 6H5C4.46957 6 3.96086 6.21071 3.58579 6.58579C3.21071 6.96086 3 7.46957 3 8Z"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0002 19L19.5922 17.408C20.496 16.5041 21.0037 15.2782 21.0037 14C21.0037 12.7218 20.496 11.4959 19.5922 10.592L15.0002 6M7.00023 10H6.99023"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
