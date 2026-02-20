import { IconProps } from "./types";

export default function LineChartIcon({
  size = 24,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M21 21H4.6C4.04 21 3.76 21 3.546 20.891C3.358 20.795 3.205 20.642 3.109 20.454C3 20.24 3 19.96 3 19.4V3M21 7L15.5 12.5L11.5 8.5L7 13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
