import { IconProps } from "./types";

export default function CoinShareIcon({
  size = 21,
  color = "var(--text-primary)",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g clipPath="url(#clip0_1319_41628)">
        <path
          d="M14.25 8.25V5.25M0.75 16.5L4.416 19.554C4.95491 20.0034 5.6343 20.2497 6.336 20.25H16.0005C16.6905 20.25 17.25 19.6905 17.25 19.0005C17.25 17.6205 16.131 16.5 14.7495 16.5H8.031M14.25 12.75C15.8413 12.75 17.3674 12.1179 18.4926 10.9926C19.6179 9.86742 20.25 8.3413 20.25 6.75C20.25 5.1587 19.6179 3.63258 18.4926 2.50736C17.3674 1.38214 15.8413 0.75 14.25 0.75C12.6587 0.75 11.1326 1.38214 10.0074 2.50736C8.88214 3.63258 8.25 5.1587 8.25 6.75C8.25 8.3413 8.88214 9.86742 10.0074 10.9926C11.1326 12.1179 12.6587 12.75 14.25 12.75Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.25 15L6.375 16.125C6.67337 16.4234 7.07804 16.591 7.5 16.591C7.92196 16.591 8.32663 16.4234 8.625 16.125C8.92337 15.8266 9.09099 15.422 9.09099 15C9.09099 14.578 8.92337 14.1734 8.625 13.875L6.879 12.129C6.31652 11.5664 5.55358 11.2502 4.758 11.25H0.75"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1319_41628">
          <rect width="21" height="21" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
