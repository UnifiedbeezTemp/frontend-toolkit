import React from "react";
import { IconProps } from "./types";

export function ArrowUpCircle({
  size = 17,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M5.00065 7.50017L7.50065 5.00017M7.50065 5.00017L10.0007 7.50017M7.50065 5.00017V11.6668M15.834 8.3335C15.834 12.4756 12.4761 15.8335 8.33398 15.8335C4.19184 15.8335 0.833984 12.4756 0.833984 8.3335C0.833984 4.19136 4.19184 0.833496 8.33398 0.833496C12.4761 0.833496 15.834 4.19136 15.834 8.3335Z"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ArrowUpCircle;
