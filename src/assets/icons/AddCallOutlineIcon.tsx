import React from "react";
import { IconProps } from "./types";

export function AddCallOutlineIcon({
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
        d="M16 11V8H13V6H16V3H18V6H21V8H18V11H16ZM19.95 21C17.8667 21 15.8043 20.55 13.763 19.65C11.7217 18.75 9.86733 17.4667 8.2 15.8C6.53267 14.1333 5.24933 12.2833 4.35 10.25C3.45067 8.21667 3.00067 6.15 3 4.05V3H8.9L9.825 8.025L6.975 10.9C7.34167 11.55 7.75 12.1667 8.2 12.75C8.65 13.3333 9.13333 13.875 9.65 14.375C10.1333 14.8583 10.6627 15.321 11.238 15.763C11.8133 16.205 12.434 16.6173 13.1 17L16 14.1L21 15.125V21H19.95ZM6.025 9L7.675 7.35L7.25 5H5.025C5.10833 5.75 5.23333 6.45433 5.4 7.113C5.56667 7.77167 5.775 8.40067 6.025 9ZM14.975 17.95C15.6417 18.2333 16.3127 18.4583 16.988 18.625C17.6633 18.7917 18.334 18.9 19 18.95V16.75L16.65 16.275L14.975 17.95Z"
        fill={color}
      />
    </svg>
  );
}

export default AddCallOutlineIcon;
