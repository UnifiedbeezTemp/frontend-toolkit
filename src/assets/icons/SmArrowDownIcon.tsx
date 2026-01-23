import { IconProps } from "./types";

export default function SmArrowDownIcon({
  size = 16,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M7.92815 2.64258V13.214M7.92815 13.214L11.8924 9.24972M7.92815 13.214L3.96387 9.24972"
        stroke={color}
        strokeWidth="1.32143"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
