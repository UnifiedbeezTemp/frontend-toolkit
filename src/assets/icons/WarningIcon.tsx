import { IconProps } from "./types";

export default function WarningIcon({
  size = 12,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M28.9732 24.001L18.3066 5.33428C18.074 4.92389 17.7367 4.58253 17.3291 4.34504C16.9216 4.10755 16.4583 3.98242 15.9866 3.98242C15.5149 3.98242 15.0516 4.10755 14.644 4.34504C14.2364 4.58253 13.8992 4.92389 13.6666 5.33428L2.99991 24.001C2.76482 24.4081 2.64154 24.8702 2.64258 25.3403C2.64363 25.8104 2.76894 26.272 3.00583 26.6781C3.24273 27.0841 3.58277 27.4204 3.9915 27.6527C4.40023 27.885 4.86312 28.0052 5.33324 28.001H26.6666C27.1344 28.0005 27.5939 27.8769 27.9989 27.6427C28.404 27.4084 28.7402 27.0717 28.9739 26.6664C29.2076 26.2611 29.3306 25.8015 29.3305 25.3336C29.3304 24.8657 29.2072 24.4061 28.9732 24.001Z"
        stroke={color}
        stroke-width="3.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16 12V17.3333"
        stroke={color}
        stroke-width="3.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16 22.666H16.0133"
        stroke={color}
        stroke-width="3.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
