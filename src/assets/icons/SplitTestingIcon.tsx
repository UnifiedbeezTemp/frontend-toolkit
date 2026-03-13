import React from "react";
import { IconProps } from "./types";

export default function SplitTestingIcon({
  size = 29,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 29 29"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M19.332 3.625H25.3737V9.66667"
        stroke={color}
        strokeWidth="2.41667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.66667 3.625H3.625V9.66667"
        stroke={color}
        strokeWidth="2.41667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 26.5833V16.5542C14.5069 15.9106 14.3852 15.2721 14.142 14.6761C13.8988 14.0802 13.5391 13.5388 13.0838 13.0838L3.625 3.625"
        stroke={color}
        strokeWidth="2.41667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.125 10.875L25.375 3.625"
        stroke={color}
        strokeWidth="2.41667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
