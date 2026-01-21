import React from "react";
import { IconProps } from "./types";

const ListPlaceholderIcon = ({ size = 66, color = "#D0D5DD" }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size * (46 / 66)}
    viewBox="0 0 66 46"
    fill="none"
  >
    <rect
      x="0.25"
      y="0.25"
      width="65.5"
      height="45.5"
      rx="2.92949"
      fill="#F8F8F8"
      stroke={color}
      strokeWidth="0.5"
    />
    <rect
      x="2.89062"
      y="12.5244"
      width="58.8341"
      height="3.17949"
      rx="1.58974"
      fill="#E7E7E7"
    />
    <rect
      x="2.89062"
      y="18.8838"
      width="58.8341"
      height="3.17949"
      rx="1.58974"
      fill="#E7E7E7"
    />
    <rect
      x="2.89062"
      y="25.2412"
      width="58.8341"
      height="3.17949"
      rx="1.58974"
      fill="#E7E7E7"
    />
    <rect
      x="2.89062"
      y="31.6006"
      width="25.4418"
      height="3.17949"
      rx="1.58974"
      fill="#E7E7E7"
    />
  </svg>
);

export default ListPlaceholderIcon;
