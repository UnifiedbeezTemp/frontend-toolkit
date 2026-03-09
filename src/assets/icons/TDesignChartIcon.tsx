import React from "react";
import { IconProps } from "./types";

export function TDesignChartIcon({
  size = 24,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
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
        d="M2 2H22V22H2V2ZM4 4V20H20V4H4ZM13 7V18H11V7H13ZM8 11V18H6V11H8ZM18 13V18H16V13H18Z"
        fill={color}
      />
    </svg>
  );
}

export default TDesignChartIcon;
