import { IconProps } from "./types";

export function PaginationArrowRightIcon({
  size = 12,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M1.6375 5.52693H11.3086M11.3086 5.52693L6.47307 10.3625M11.3086 5.52693L6.47307 0.691406"
        stroke={color}
        strokeWidth="1.38158"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
