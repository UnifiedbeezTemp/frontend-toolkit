import { IconProps } from "./types"

export function FilledChevronIcon({
  size = 8,
  color = "black",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size / 2}
      viewBox="0 0 8 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M7.616 0.000593806L3.808 3.80859L-1.66453e-07 0.000594139L7.616 0.000593806Z"
        fill={color === "currentColor" ? "black" : color}
      />
    </svg>
  )
}
