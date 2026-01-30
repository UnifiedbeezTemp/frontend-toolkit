import { IconProps } from "./types";

export function RedoIcon({
  size = 17,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M6.59922 3.3V0L10.7242 4.125L6.59922 8.25V4.95C3.86847 4.95 1.64922 7.16925 1.64922 9.9C1.64922 12.6307 3.86847 14.85 6.59922 14.85C9.32997 14.85 11.5492 12.6307 11.5492 9.9H13.1992C13.1992 13.5465 10.2457 16.5 6.59922 16.5C2.95272 16.5 -0.000781059 13.5465 -0.000781059 9.9C-0.000781059 6.2535 2.95272 3.3 6.59922 3.3Z"
        fill={color}
      />
    </svg>
  );
}
