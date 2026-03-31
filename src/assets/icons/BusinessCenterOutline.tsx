import { IconProps } from "./types";

export default function BusinessCenterOutline({
  size = 24,
  color = "var(--inactive-color)",
  isActive,
  ...props
}: IconProps) {
  const resolvedColor = isActive ? "var(--brand-primary)" : color;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M4 21C3.45 21 2.97933 20.8043 2.588 20.413C2.19667 20.0217 2.00067 19.5507 2 19V8C2 7.45 2.196 6.97933 2.588 6.588C2.98 6.19667 3.45067 6.00067 4 6H8V4C8 3.45 8.196 2.97933 8.588 2.588C8.98 2.19667 9.45067 2.00067 10 2H14C14.55 2 15.021 2.196 15.413 2.588C15.805 2.98 16.0007 3.45067 16 4V6H20C20.55 6 21.021 6.196 21.413 6.588C21.805 6.98 22.0007 7.45067 22 8V19C22 19.55 21.8043 20.021 21.413 20.413C21.0217 20.805 20.5507 21.0007 20 21H4ZM10 6H14V4H10V6ZM20 15H15V16C15 16.2833 14.904 16.521 14.712 16.713C14.52 16.905 14.2827 17.0007 14 17H10C9.71667 17 9.47933 16.904 9.288 16.712C9.09667 16.52 9.00067 16.2827 9 16V15H4V19H20V15ZM11 15H13V13H11V15ZM4 13H9V12C9 11.7167 9.096 11.4793 9.288 11.288C9.48 11.0967 9.71733 11.0007 10 11H14C14.2833 11 14.521 11.096 14.713 11.288C14.905 11.48 15.0007 11.7173 15 12V13H20V8H4V13Z"
        fill={resolvedColor}
      />
    </svg>
  );
}

