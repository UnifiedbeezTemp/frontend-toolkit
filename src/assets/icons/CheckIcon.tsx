import { IconProps } from "./types";

export default function CheckIcon({
  size = 16,
  color = "var(--success)",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M13.3334 4L6.00008 11.3333L2.66675 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
