import { IconProps } from "./types"

export default function PIcon({
  size,
  width = size ?? 14,
  height = size ?? 18,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M0 14.98H0.93534C1.41568 14.98 1.71898 14.6701 1.71898 14.1794V3.22846C1.71898 2.73773 1.41568 2.4278 0.93534 2.4278H0V0H6.77488C10.4151 0 13.2969 1.88542 13.2969 5.47551C13.2969 9.09131 10.4151 10.9768 6.77488 10.9768H4.44918V14.1794C4.44918 14.6701 4.75248 14.98 5.25808 14.98H7.15398V17.4337H0V14.98ZM6.57258 8.44561C8.97418 8.44561 10.3645 7.41251 10.3645 5.52711C10.3645 3.59005 8.97418 2.6086 6.57258 2.6086H4.44918V8.47151H6.57258V8.44561Z"
        fill={color}
      />
    </svg>
  )
}
