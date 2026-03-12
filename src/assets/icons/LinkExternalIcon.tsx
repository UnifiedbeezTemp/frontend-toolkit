import React from "react";
import { IconProps } from "./types";

export function LinkExternalIcon({
  size = 20,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M10.8333 9.16667L17.5 2.5M17.5 2.5H12.5M17.5 2.5V7.5M9.16667 2.5H7.5C6.09987 2.5 5.3998 2.5 4.86502 2.77248C4.39462 3.01217 4.01217 3.39462 3.77248 3.86502C3.5 4.3998 3.5 5.09987 3.5 6.5V12.5C3.5 13.9001 3.5 14.6002 3.77248 15.135C4.01217 15.6054 4.39462 15.9878 4.86502 16.2275C5.3998 16.5 6.09987 16.5 7.5 16.5H13.5C14.9001 16.5 15.6002 16.5 16.135 16.2275C16.6054 15.9878 16.9878 15.6054 17.2275 15.135C17.5 14.6002 17.5 13.9001 17.5 12.5V10.8333"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default LinkExternalIcon;
