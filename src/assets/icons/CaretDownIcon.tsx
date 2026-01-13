import { IconProps } from "./types"

export default function CaretDownIcon({
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
        d="M15.8113 10.4967L12.0033 14.3047L8.19531 10.4967L15.8113 10.4967Z"
        fill={color}
      />
    </svg>
  )
}

