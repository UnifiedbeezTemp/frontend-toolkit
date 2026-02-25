import { IconProps } from "./types";

export default function TrendIcon({
  size = 19,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      className={className}
      fill="none"
    >
      <path
        d="M18.3346 5.8335L11.2513 12.9168L7.08464 8.75016L1.66797 14.1668"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.332 5.8335H18.332V10.8335"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
