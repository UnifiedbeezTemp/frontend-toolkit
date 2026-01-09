import React from "react"
import { IconProps } from "./types"

export function SearchIcon({
  size = 17,
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
      viewBox="0 0 17 17"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M7.33317 14.0001C11.0151 14.0001 13.9998 11.0153 13.9998 7.33342C13.9998 3.65152 11.0151 0.666748 7.33317 0.666748C3.65127 0.666748 0.666504 3.65152 0.666504 7.33342C0.666504 11.0153 3.65127 14.0001 7.33317 14.0001Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6663 15.6668L12.083 12.0835"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SearchIcon
