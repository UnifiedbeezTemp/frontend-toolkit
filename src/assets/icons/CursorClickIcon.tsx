import { IconProps } from "./types";

export default function CursorClickIcon({
  size,
  width = size ?? 14,
  height = size ?? 14,
  color = "currentColor",
  strokeWidth = 1.23,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M4.92695 1.53896V0.615234M2.50102 2.50005L1.84785 1.84687M2.50102 7.38925L1.84785 8.04242M7.39022 2.50005L8.0434 1.84687M1.53994 4.92597H0.616211M4.61904 4.61806L7.15074 12.4869L8.92977 10.7078L11.1536 12.9316L12.9326 11.1526L10.7088 8.92879L12.4878 7.14976L4.61904 4.61806Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
