import { IconProps } from "./types";

export function AppsIcon({
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
        d="M3.66667 3.66667H0V0H3.66667V3.66667ZM11 0H7.33333V3.66667H11V0ZM18.3333 0H14.6667V3.66667H18.3333V0ZM3.66667 7.33333H0V11H3.66667V7.33333ZM11 7.33333H7.33333V11H11V7.33333ZM18.3333 7.33333H14.6667V11H18.3333V7.33333ZM3.66667 14.6667H0V18.3333H3.66667V14.6667ZM11 14.6667H7.33333V18.3333H11V14.6667ZM18.3333 14.6667H14.6667V18.3333H18.3333V14.6667Z"
        fill={color}
      />
    </svg>
  );
}
