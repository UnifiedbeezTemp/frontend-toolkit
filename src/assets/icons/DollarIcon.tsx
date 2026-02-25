import { IconProps } from "./types";

export function DollarIcon({
  size = 14,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={(size * 22) / 14}
      viewBox="0 0 14 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M1 15C1 17.2091 2.79086 19 5 19H9C11.2091 19 13 17.2091 13 15C13 12.7909 11.2091 11 9 11H5C2.79086 11 1 9.20914 1 7C1 4.79086 2.79086 3 5 3H9C11.2091 3 13 4.79086 13 7M7 1V21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default DollarIcon;
