import { IconProps } from "./types";

export function PaginationArrowLeftIcon({
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
        d="M10.3625 5.52693H0.691406M0.691406 5.52693L5.52693 10.3625M0.691406 5.52693L5.52693 0.691406"
        stroke={color}
        strokeWidth="1.38158"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
