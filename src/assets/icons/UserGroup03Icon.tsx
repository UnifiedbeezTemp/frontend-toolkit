import React from "react";
import { IconProps } from "./types";

export default function UserGroup03Icon({
  size = 28,
  color =  "var(--brand-secondary)",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <path
        d="M17.2395 9.19395C17.2395 11.0982 15.6959 12.6418 13.7916 12.6418C11.8874 12.6418 10.3438 11.0982 10.3438 9.19395C10.3438 7.28976 11.8874 5.74609 13.7916 5.74609C15.6959 5.74609 17.2395 7.28976 17.2395 9.19395Z"
        stroke={color}
        strokeWidth="1.72393"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3906 4.59668C20.2948 4.59668 21.8385 6.14034 21.8385 8.04454C21.8385 9.45022 20.9972 10.6594 19.7908 11.1962"
        stroke={color}
        strokeWidth="1.72393"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.7605 16.0898H11.8201C9.09976 16.0898 6.89453 18.2951 6.89453 21.0153C6.89453 22.1035 7.77662 22.9856 8.86473 22.9856H18.7158C19.8039 22.9856 20.686 22.1035 20.686 21.0153C20.686 18.2951 18.4807 16.0898 15.7605 16.0898Z"
        stroke={color}
        strokeWidth="1.72393"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.3594 14.9404C23.0796 14.9404 25.2849 17.1457 25.2849 19.8659C25.2849 20.9541 24.4028 21.8362 23.3147 21.8362"
        stroke={color}
        strokeWidth="1.72393"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.19395 4.59668C7.28976 4.59668 5.74609 6.14034 5.74609 8.04454C5.74609 9.45022 6.58729 10.6594 7.79376 11.1962"
        stroke={color}
        strokeWidth="1.72393"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.26709 21.8362C3.17896 21.8362 2.29688 20.9541 2.29688 19.8659C2.29688 17.1457 4.5021 14.9404 7.22239 14.9404"
        stroke={color}
        strokeWidth="1.72393"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
