import { IconProps } from "./types"

export default function SpacerIcon({
  size,
  width = size ?? 48,
  height = size ?? 42,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg {...props} width={width} height={height} viewBox="0 0 48 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.4106 28.2144L18.6519 25.9731L22.3125 29.6089V22.3125H25.5V29.6089L29.1606 25.9731L31.4019 28.2144L23.9062 35.71L16.4106 28.2144ZM22.3125 19.125V11.8286L18.6519 15.4644L16.4106 13.2231L23.9062 5.72754L31.4019 13.2231L29.1606 15.4644L25.5 11.8286V19.125H22.3125ZM47.8125 0V3.1875H0V0H47.8125ZM0 38.25H47.8125V41.4375H0V38.25Z" fill={color} />
    </svg>
  )
}
