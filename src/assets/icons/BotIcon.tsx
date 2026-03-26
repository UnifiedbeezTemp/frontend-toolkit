import React from "react";
import { IconProps } from "./types";

export default function BotIcon({
  size = 20,
  color = "var(--text-primary)",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M9.99935 6.66732V3.33398H6.66602"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.0007 6.66602H5.00065C4.08018 6.66602 3.33398 7.41221 3.33398 8.33268V14.9993C3.33398 15.9198 4.08018 16.666 5.00065 16.666H15.0007C15.9211 16.666 16.6673 15.9198 16.6673 14.9993V8.33268C16.6673 7.41221 15.9211 6.66602 15.0007 6.66602Z"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.66602 11.666H3.33268"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.666 11.666H18.3327"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 10.834V12.5007"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 10.834V12.5007"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
