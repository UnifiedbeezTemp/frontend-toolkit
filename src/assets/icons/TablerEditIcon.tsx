import React from "react";
import { IconProps } from "./types";

export function TablerEditIcon({
  size = 28,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M8.16699 8.16699H7.00033C6.38149 8.16699 5.78799 8.41282 5.35041 8.85041C4.91282 9.28799 4.66699 9.88149 4.66699 10.5003V21.0003C4.66699 21.6192 4.91282 22.2127 5.35041 22.6502C5.78799 23.0878 6.38149 23.3337 7.00033 23.3337H17.5003C18.1192 23.3337 18.7127 23.0878 19.1502 22.6502C19.5878 22.2127 19.8337 21.6192 19.8337 21.0003V19.8337"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.6667 5.83346L22.1667 9.33346M23.7825 7.68263C24.242 7.22314 24.5001 6.59994 24.5001 5.95012C24.5001 5.30031 24.242 4.67711 23.7825 4.21762C23.323 3.75814 22.6998 3.5 22.05 3.5C21.4002 3.5 20.777 3.75814 20.3175 4.21762L10.5 14.0001V17.5001H14L23.7825 7.68263Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default TablerEditIcon;
