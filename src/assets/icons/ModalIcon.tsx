import React from "react";
import { IconProps } from "./types";

interface FormIconProps extends IconProps {
  isActive?: boolean;
}

export default function ModalIcon({
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
        x="5.51367"
        y="15.5898"
        width="45.5989"
        height="34.742"
        rx="4.34275"
        fill="var(--black-10)"
      />
      <rect
        x="55.4648"
        y="15.5898"
        width="45.5989"
        height="34.742"
        rx="4.34275"
        fill="var(--black-10)"
      />
      <rect
        x="5.51367"
        y="69.875"
        width="95.5405"
        height="4.34275"
        rx="2.17138"
        fill="var(--black-10)"
      />
      <rect
        x="5.51367"
        y="87.248"
        width="95.5405"
        height="4.34275"
        rx="2.17138"
        fill="var(--black-10)"
      />
      <rect
        x="5.51367"
        y="61.1895"
        width="95.5405"
        height="4.34275"
        rx="2.17138"
        fill="var(--black-10)"
      />
      <rect
        x="5.51367"
        y="78.5605"
        width="95.5405"
        height="4.34275"
        rx="2.17138"
        fill="var(--black-10)"
      />
      <rect
        x="23.5137"
        y="25.5898"
        width="60"
        height="34"
        rx="3.17949"
        fill={isActive ? activeColor : "var(--inactive-color)"}
      />
      <rect
        x="29.5137"
        y="31.5898"
        width="47"
        height="3.3872"
        rx="1.6936"
        fill="var(--black-10)"
      />
      <rect
        x="29.5137"
        y="38.3652"
        width="47"
        height="3.3872"
        rx="1.6936"
        fill="var(--black-10)"
      />
      <rect
        x="29.5137"
        y="45.1367"
        width="47"
        height="3.3872"
        rx="1.6936"
        fill="var(--black-10)"
      />
      <rect
        x="29.5137"
        y="51.9121"
        width="20.3243"
        height="3.3872"
        rx="1.6936"
        fill="var(--black-10)"
      />
    </svg>
  );
}
