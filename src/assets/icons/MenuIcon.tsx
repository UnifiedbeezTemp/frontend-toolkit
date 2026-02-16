import { IconProps } from "./types";

export function MenuIcon({
  size = 18,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M0 10.8333V9.5H18V10.8333H0ZM0 5.5V4.16667H18V5.5H0ZM0 1.33333V0H18V1.33333H0Z"
        fill={color}
      />
    </svg>
  );
}

export default MenuIcon;
