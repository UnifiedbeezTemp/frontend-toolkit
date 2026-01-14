import { IconProps } from "./types";

export default function ChevronLeft({
  size = 12,
  height = 7,
  color = "currentColor",
  strokeWidth = 1.66667,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={height}
      viewBox="0 0 7 12"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M5.8335 10.8335L0.8335 5.8335L5.8335 0.833496"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
