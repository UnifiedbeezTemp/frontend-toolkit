import { IconProps } from "./types";

export default function PoundSignIcon({
  size = 24,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M15 19.5H8.5C7.67157 19.5 7 18.8284 7 18C7 17.25 7.5 16.5 8.5 16C9.5 15.5 10 14.5 10 13.5V10C10 8 11.5 6.5 13.5 6.5C15.5 6.5 16 8 16 9.5M7 13.5H13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
