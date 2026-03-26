import React from "react";
import { IconProps } from "./types";

export default function FolderFilesOutlineIcon({
  size = 23,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 23 23"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M5.03125 6.46875V3.59375H17.9688V8.625M3.59375 11.5H19.4062M3.59375 6.46875V17.9688H19.4062V8.625H10.7812L8.625 6.46875H3.59375Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
