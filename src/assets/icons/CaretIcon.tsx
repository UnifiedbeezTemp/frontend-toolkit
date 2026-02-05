import { IconProps } from "./types"

export default function CaretIcon({
  size = 8,
  height = 4,
  color = "#545859",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 8 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M7.616 0.00059423L3.808 3.80859L4.54099e-08 0.000594139L7.616 0.00059423Z"
        fill={color}
      />
    </svg>
  )
}
