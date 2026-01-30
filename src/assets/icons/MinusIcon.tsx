import { IconProps } from "./types";

export const MinusIcon = ({ size = 24, className = "" }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 9 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line
        x1="0.5"
        y1="0.5"
        x2="8.5"
        y2="0.5"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
};
