import { IconProps } from "./types"

export function PaperclipIcon({
  size = 20,
  height = 21,
  color = "currentColor",
  strokeWidth = 2,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={height}
      viewBox="0 0 20 21"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M18.9779 9.44975L9.96231 18.4654C7.91206 20.5156 4.58794 20.5156 2.53769 18.4654C0.487437 16.4151 0.487437 13.091 2.53769 11.0407L11.5533 2.02513C12.9201 0.658291 15.1362 0.658291 16.503 2.02513C17.8699 3.39196 17.8699 5.60804 16.503 6.97487L7.84099 15.6369C7.15757 16.3203 6.04953 16.3203 5.36612 15.6369C4.6827 14.9535 4.6827 13.8455 5.36612 13.1621L12.9675 5.56066"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
