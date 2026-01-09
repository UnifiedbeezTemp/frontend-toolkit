import { IconProps } from "./types"

export default function TimesIcon({
  size = 14,
  color = "currentColor",
  strokeWidth = 1.97656,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M12.8477 0.988281L0.988281 12.8477M0.988281 0.988281L12.8477 12.8477"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

