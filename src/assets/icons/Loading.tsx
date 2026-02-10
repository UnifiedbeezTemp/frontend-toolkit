import React from "react";

interface IconProps {
  size?: number;
  className?: string;
  stroke?: string;
}

export const LoadingIcon = ({ size = 22, className = "", stroke = "var(--brand-secondary)" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M11.0026 1.83398V5.50065M11.0026 16.5007V20.1673M5.5026 11.0007H1.83594M20.1693 11.0007H16.5026M17.4912 17.4892L14.8984 14.8965M17.4912 4.58393L14.8984 7.17666M4.51405 17.4892L7.10677 14.8965M4.51405 4.58393L7.10677 7.17666"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
