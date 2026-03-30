import { IconProps } from "./types"

export default function CodeIcon({
  size,
  width = size ?? 39,
  height = size ?? 39,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg {...props}  fill="none" width="49" height="29" viewBox="0 0 49 29" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 29L0 14.5L14.5 0L17.9437 3.44375L6.82708 14.5604L17.8833 25.6167L14.5 29ZM33.8333 29L30.3896 25.5563L41.5062 14.4396L30.45 3.38333L33.8333 0L48.3333 14.5L33.8333 29Z" fill={color}/>
</svg>

  )
}
