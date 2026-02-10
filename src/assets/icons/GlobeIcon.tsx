import { IconProps } from "./types"

export default function GlobeIcon({
  size = 22,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M10.75 0.75C13.2513 3.48835 14.6728 7.04203 14.75 10.75C14.6728 14.458 13.2513 18.0116 10.75 20.75M10.75 0.75C8.24872 3.48835 6.82725 7.04203 6.75 10.75C6.82725 14.458 8.24872 18.0116 10.75 20.75M10.75 0.75C5.22715 0.75 0.75 5.22715 0.75 10.75C0.75 16.2728 5.22715 20.75 10.75 20.75M10.75 0.75C16.2728 0.75 20.75 5.22715 20.75 10.75C20.75 16.2728 16.2728 20.75 10.75 20.75M1.25002 7.75H20.25M1.25 13.75H20.25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
