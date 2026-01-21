import React from "react"
import { IconProps } from "./types"

export function ChevronDownIcon({
  size = 12,
  height = 7,
  color = "currentColor",
  strokeWidth = 1.66667,
  className,
  ...props
}: IconProps

) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={height}
      viewBox="0 0 12 7"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M0.833008 0.833344L5.83301 5.83334L10.833 0.833344"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ChevronDownIcon
