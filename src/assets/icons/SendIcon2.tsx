import React from "react";
import { IconProps } from "./types";

export default function SendIcon2({
  size = 16,
  color = "var(--dark-base-70)",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M9.69314 14.4572C9.71847 14.5203 9.7625 14.5742 9.81932 14.6116C9.87615 14.6489 9.94304 14.668 10.011 14.6663C10.079 14.6646 10.1449 14.6421 10.1997 14.6018C10.2545 14.5616 10.2957 14.5055 10.3178 14.4412L14.6511 1.77454C14.6725 1.71547 14.6765 1.65154 14.6629 1.59024C14.6492 1.52894 14.6184 1.4728 14.574 1.42839C14.5295 1.38398 14.4734 1.35314 14.4121 1.33947C14.3508 1.3258 14.2869 1.32987 14.2278 1.35121L1.56114 5.68454C1.49681 5.7066 1.44076 5.74782 1.40052 5.80266C1.36029 5.85749 1.33779 5.92332 1.33605 5.99131C1.33431 6.05931 1.3534 6.1262 1.39078 6.18303C1.42816 6.23985 1.48202 6.28388 1.54514 6.30921L6.83181 8.42921C6.99893 8.49612 7.15078 8.59618 7.27819 8.72336C7.40559 8.85054 7.50593 9.0022 7.57314 9.16921L9.69314 14.4572Z"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5668 1.43115L7.27344 8.72382"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

