import { IconProps } from "./types"

export default function DotPointsIcon({
  size,
  width = size ?? 20,
  height = size ?? 16,
  color = "currentColor",
  strokeWidth = 1.5,
  className,
  ...props
}: IconProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 20 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path 
        d="M19.2281 7.93318L6.90743 7.93317M19.2281 1.77282L6.90743 1.77282M19.2281 14.0935L6.90743 14.0935M2.80052 7.93317C2.80052 8.50022 2.34084 8.9599 1.7738 8.9599C1.20675 8.9599 0.74707 8.50022 0.74707 7.93317C0.74707 7.36613 1.20675 6.90645 1.7738 6.90645C2.34084 6.90645 2.80052 7.36613 2.80052 7.93317ZM2.80052 1.77282C2.80052 2.33986 2.34084 2.79955 1.7738 2.79955C1.20675 2.79955 0.74707 2.33986 0.74707 1.77282C0.74707 1.20577 1.20675 0.746094 1.7738 0.746094C2.34084 0.746094 2.80052 1.20577 2.80052 1.77282ZM2.80052 14.0935C2.80052 14.6606 2.34084 15.1203 1.7738 15.1203C1.20675 15.1203 0.74707 14.6606 0.74707 14.0935C0.74707 13.5265 1.20675 13.0668 1.7738 13.0668C2.34084 13.0668 2.80052 13.5265 2.80052 14.0935Z" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}
