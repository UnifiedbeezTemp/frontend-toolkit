import { IconProps } from "./types";

export default function TaskIcon({
  size = 20,
  color = "var(--text-primary)",
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_399_52139)">
        <path
          d="M10.0026 16.6654H20.0026M10.0026 9.9987H20.0026M10.0026 3.33203H20.0026M0.835938 15.832L3.33594 18.332L7.5026 14.1654M0.835938 9.16536L3.33594 11.6654L7.5026 7.4987M7.5026 0.832031L3.33594 4.9987L0.835938 2.4987"
          stroke={color || "var(--text-primary)"}
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_399_52139">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
