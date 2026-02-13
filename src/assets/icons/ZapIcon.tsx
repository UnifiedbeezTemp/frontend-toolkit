import { IconProps } from "./types";

export function ZapIcon({
  size = 20,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  const height = (size * 32) / 36;
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 36 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M12.625 24.8125H3.6875M8.5625 15.875H1.25M12.625 6.9375H4.5M25.625 1.25L14.9058 16.2569C14.4314 16.9211 14.1941 17.2532 14.2044 17.5301C14.2133 17.7712 14.3289 17.9958 14.5199 18.1432C14.7393 18.3125 15.1474 18.3125 15.9636 18.3125H24L22.375 30.5L33.0942 15.4931C33.5686 14.8289 33.8059 14.4968 33.7956 14.2199C33.7867 13.9788 33.6711 13.7542 33.4801 13.6068C33.2607 13.4375 32.8526 13.4375 32.0363 13.4375H24L25.625 1.25Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
