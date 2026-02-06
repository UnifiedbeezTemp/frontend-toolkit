import React from "react";
import { IconProps } from "./types";

interface FormIconProps extends IconProps {
  isActive?: boolean;
}

export default function StickyBarIcon({
  className,
  size = 109,
  isActive,
}: FormIconProps) {
  const activeColor = "var(--brand-primary)";
  const inactiveColor = "var(--input-stroke)";
  const fillColor = isActive ? activeColor : inactiveColor;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 109 109"
      fill="none"
      className={className}
    >
      <rect
        x="0.794922"
        y="0.794922"
        width="106.513"
        height="106.513"
        rx="7.15385"
        fill="white"
      />
      <rect
        x="0.794922"
        y="0.794922"
        width="106.513"
        height="106.513"
        rx="7.15385"
        stroke={fillColor}
        strokeWidth="1.58974"
      />
      <rect
        x="6.23047"
        y="15.5898"
        width="45.5989"
        height="34.742"
        rx="4.34275"
        fill="var(--black-10)"
      />
      <rect
        x="56.1816"
        y="15.5898"
        width="45.5989"
        height="34.742"
        rx="4.34275"
        fill="var(--black-10)"
      />
      <rect
        x="6.23047"
        y="69.875"
        width="95.5405"
        height="4.34275"
        rx="2.17138"
        fill="var(--black-10)"
      />
      <rect
        x="6.23047"
        y="87.248"
        width="95.5405"
        height="4.34275"
        rx="2.17138"
        fill="var(--black-10)"
      />
      <rect
        x="6.23047"
        y="61.1895"
        width="95.5405"
        height="4.34275"
        rx="2.17138"
        fill="var(--black-10)"
      />
      <rect
        x="6.23047"
        y="78.5605"
        width="95.5405"
        height="4.34275"
        rx="2.17138"
        fill="var(--black-10)"
      />
      <rect
        x="11.2305"
        y="5.58984"
        width="86"
        height="35"
        rx="3.17949"
        fill={isActive ? activeColor : "var(--inactive-color)"}
      />
      <rect
        x="18.3359"
        y="11.2344"
        width="68.7013"
        height="3.3872"
        rx="1.6936"
        fill="var(--black-10)"
      />
      <rect
        x="18.3359"
        y="18.0098"
        width="68.7013"
        height="3.3872"
        rx="1.6936"
        fill="var(--black-10)"
      />
      <rect
        x="18.3359"
        y="24.7812"
        width="68.7013"
        height="3.3872"
        rx="1.6936"
        fill="var(--black-10)"
      />
      <rect
        x="18.3359"
        y="31.5566"
        width="29.7087"
        height="3.3872"
        rx="1.6936"
        fill="var(--black-10)"
      />
    </svg>
  );
}
