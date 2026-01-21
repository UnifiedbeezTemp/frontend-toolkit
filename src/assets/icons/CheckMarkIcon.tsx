import { IconProps } from "./types"

export default function CheckMarkIcon({
  size = 17,
  height = 13,
  color = "currentColor",
  className,
  ...props
}: IconProps

) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={height}
      viewBox="0 0 17 13"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M5.7 12.025L0 6.325L1.425 4.9L5.7 9.175L14.875 0L16.3 1.425L5.7 12.025Z"
        fill={color}
      />
    </svg>
  )
}

