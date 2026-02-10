import React from "react";
import { IconProps } from "./types";

interface FormIconProps extends IconProps {
  isActive?: boolean;
}

export default function WebsiteFormIcon({
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
        width="104.923"
        height="104.923"
        rx="6.35897"
        fill="white"
      />
      <rect
        x="0"
        y="0"
        width="106.513"
        height="106.513"
        rx="7.15385"
        stroke={fillColor}
        strokeWidth="1.58974"
      />
      <rect
        x="5"
        y="14"
        width="45.5989"
        height="34.742"
        rx="4.34275"
        fill="var(--black-10)"
      />
      <rect
        x="54.9512"
        y="14"
        width="45.5989"
        height="34.742"
        rx="4.34275"
        fill="var(--black-10)"
      />
      <rect
        x="5"
        y="68.2852"
        width="95.5405"
        height="4.34275"
        rx="2.17138"
        fill="var(--black-10)"
      />
      <rect
        x="5"
        y="85.6582"
        width="95.5405"
        height="4.34275"
        rx="2.17138"
        fill="var(--black-10)"
      />
      <rect
        x="5"
        y="59.5996"
        width="95.5405"
        height="4.34275"
        rx="2.17138"
        fill="var(--black-10)"
      />
      <rect
        x="5"
        y="76.9707"
        width="95.5405"
        height="4.34275"
        rx="2.17138"
        fill="var(--black-10)"
      />
      <rect
        x="21"
        y="22"
        width="63"
        height="60"
        rx="3.17949"
        fill={isActive ? activeColor : "var(--inactive-color)"}
      />
      <rect
        x="26"
        y="38.9629"
        width="53.6623"
        height="4.17308"
        rx="2.08654"
        fill="var(--green-10)"
      />
      <rect
        x="26"
        y="47.3105"
        width="53.6623"
        height="4.17308"
        rx="2.08654"
        fill="var(--green-10)"
      />
      <rect
        x="26"
        y="55.6543"
        width="53.6623"
        height="4.17308"
        rx="2.08654"
        fill="var(--green-10)"
      />
      <rect
        x="26"
        y="64"
        width="23.2053"
        height="4.17308"
        rx="2.08654"
        fill="var(--green-10)"
      />
    </svg>
  );
}
