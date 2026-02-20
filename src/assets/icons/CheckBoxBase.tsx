import React from "react";

interface IconProps {
  size?: number;
  className?: string;
  fill?: string;
}

export const CheckBoxBase = ({ size = 16, className = "", fill = "var(--success)" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="0.4" y="0.4" width="15.2" height="15.2" rx="7.6" fill={fill} />
    <rect x="0.4" y="0.4" width="15.2" height="15.2" rx="7.6" stroke="white" strokeWidth="0.8" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.3994 5.48845C10.491 5.34458 10.5217 5.17021 10.4847 5.00371C10.4477 4.83721 10.3461 4.69221 10.2023 4.60061C10.0584 4.50901 9.88399 4.47832 9.71747 4.51529C9.55095 4.55225 9.40594 4.65385 9.31434 4.79772L6.79715 8.75273L5.64526 7.31299C5.53877 7.1798 5.38372 7.09436 5.21423 7.07548C5.04474 7.05659 4.87469 7.10581 4.74149 7.21229C4.60828 7.31878 4.52284 7.47381 4.50396 7.64329C4.48507 7.81276 4.53429 7.9828 4.64078 8.11599L6.35491 10.2585C6.41879 10.3384 6.50084 10.402 6.59423 10.4438C6.68762 10.4856 6.78965 10.5046 6.89184 10.4991C6.99403 10.4935 7.09343 10.4637 7.18175 10.412C7.27008 10.3603 7.34479 10.2883 7.39966 10.2019L10.3994 5.48845Z"
      fill="white"
    />
  </svg>
);
