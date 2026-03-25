import { IconProps } from "./types";

export default function SalesReportIcon({
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
        d="M20.5 7L12 2L3.5 7V17L12 22L20.5 17V7Z"
        stroke={resolvedColor}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 11V15M16 9V15M8 13V15"
        stroke={resolvedColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

