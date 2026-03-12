import { IconProps } from "./types";

export default function CardIcon({
  size = 20,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M16.666 4.16602H3.33268C2.41221 4.16602 1.66602 4.91221 1.66602 5.83268V14.166C1.66602 15.0865 2.41221 15.8327 3.33268 15.8327H16.666C17.5865 15.8327 18.3327 15.0865 18.3327 14.166V5.83268C18.3327 4.91221 17.5865 4.16602 16.666 4.16602Z"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.66602 8.33398H18.3327"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
