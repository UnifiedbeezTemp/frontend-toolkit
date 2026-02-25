import { IconProps } from "./types";

export function ReplyArrowReverseIcon({
  size = 19,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M2 9.5L8.4 2.5V6C11.6 6 18 8.1 18 16.5C18 15.333 16.08 13 8.4 13V16.5L2 9.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ReplyArrowReverseIcon;
