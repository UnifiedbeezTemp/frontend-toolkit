import { IconProps } from "./types";

export function ClockIcon({
  size = 17,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_clock)">
        <path
          d="M8.50033 4.24935V8.49935L11.3337 9.91602M15.5837 8.49935C15.5837 12.4114 12.4123 15.5827 8.50033 15.5827C4.58831 15.5827 1.41699 12.4114 1.41699 8.49935C1.41699 4.58733 4.58831 1.41602 8.50033 1.41602C12.4123 1.41602 15.5837 4.58733 15.5837 8.49935Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_clock">
          <rect width="17" height="17" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default ClockIcon;
