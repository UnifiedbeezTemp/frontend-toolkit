import React from "react";

interface CreateOwnTemplateIconProps {
  size?: number;
  className?: string;
  strokeColor?: string;
  isActive?: boolean;
}

export default function CreateOwnTemplateIcon({
  size = 41,
  className,
  strokeColor,
  isActive = false,
}: CreateOwnTemplateIconProps) {
  // Use strokeColor if provided, otherwise default to gradient/white
  const defaultStroke = isActive ? "white" : "url(#paint_gradient_inactive)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M28.5272 32.191H3.42264C2.28991 32.191 1.36719 31.2746 1.36719 30.1355V5.43827C1.36719 4.30554 2.28355 3.38281 3.42264 3.38281H31.8745C33.0072 3.38281 33.9299 4.29918 33.9299 5.43827V26.5146"
        stroke={strokeColor || defaultStroke}
        strokeWidth="1.27273"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.9325 37.3338C36.9199 37.3338 39.3416 34.9121 39.3416 31.9247C39.3416 28.9374 36.9199 26.5156 33.9325 26.5156C30.9452 26.5156 28.5234 28.9374 28.5234 31.9247C28.5234 34.9121 30.9452 37.3338 33.9325 37.3338Z"
        stroke={strokeColor || defaultStroke}
        strokeWidth="1.27273"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.9375 29.4219V34.4237"
        stroke={strokeColor || defaultStroke}
        strokeWidth="1.27273"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.4315 31.9219H31.4297"
        stroke={strokeColor || defaultStroke}
        strokeWidth="1.27273"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.375 10.7188H33.9314"
        stroke={strokeColor || defaultStroke}
        strokeWidth="1.27273"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.2422 7.25H30.3104"
        stroke={strokeColor || defaultStroke}
        strokeWidth="1.27273"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.3359 7.25H25.4041"
        stroke={strokeColor || defaultStroke}
        strokeWidth="1.27273"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.04688 15.6094H29.2614"
        stroke={strokeColor || defaultStroke}
        strokeWidth="1.27273"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.04688 25.375H25.4051"
        stroke={strokeColor || defaultStroke}
        strokeWidth="1.27273"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.04688 20.4922H29.2614"
        stroke={strokeColor || defaultStroke}
        strokeWidth="1.27273"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint_gradient_inactive"
          x1="17.6"
          y1="3.3"
          x2="41.1"
          y2="48.2"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#545859" />
          <stop offset="1" stopColor="#9D9FA0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
