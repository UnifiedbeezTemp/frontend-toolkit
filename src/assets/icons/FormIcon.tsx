import { IconProps } from "./types";

export function FormIcon({
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
        d="M3.15625 5.53776C3.15625 4.04682 3.15625 3.30135 3.61943 2.83818C4.0826 2.375 4.82807 2.375 6.31901 2.375H12.6445C14.1355 2.375 14.8809 2.375 15.3441 2.83818C15.8073 3.30135 15.8073 4.04682 15.8073 5.53776V11.8633C15.8073 14.0997 15.8073 15.2179 15.1125 15.9126C14.4177 16.6074 13.2995 16.6074 11.0632 16.6074H7.90039C5.66398 16.6074 4.54578 16.6074 3.85101 15.9126C3.15625 15.2179 3.15625 14.0997 3.15625 11.8633V5.53776Z"
        stroke={color}
        strokeWidth="1.58138"
      />
      <path
        d="M11.8535 14.2344V16.6064M7.10938 14.2344V16.6064"
        stroke={color}
        strokeWidth="1.58138"
        strokeLinecap="round"
      />
      <path
        d="M7.10938 6.32812H11.8535"
        stroke={color}
        strokeWidth="1.58138"
        strokeLinecap="round"
      />
      <path
        d="M7.10938 9.48438H11.8535"
        stroke={color}
        strokeWidth="1.58138"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default FormIcon;
