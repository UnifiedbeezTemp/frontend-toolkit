import { IconProps } from "./types";

export default function GiftIcon({
  size = 20,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M10 11.2773H2C1.72386 11.2773 1.5 11.5012 1.5 11.7773V12.7773C1.5 13.0535 1.72386 13.2773 2 13.2773H10C10.2761 13.2773 10.5 13.0535 10.5 12.7773V11.7773C10.5 11.5012 10.2761 11.2773 10 11.2773Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 11.2773V17.7773"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 13.2773V16.7773C9.5 17.0426 9.39464 17.2969 9.20711 17.4845C9.01957 17.672 8.76522 17.7773 8.5 17.7773H3.5C3.23478 17.7773 2.98043 17.672 2.79289 17.4845C2.60536 17.2969 2.5 17.0426 2.5 16.7773V13.2773"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 11.2776C3.41848 11.2776 3.10054 11.1459 2.86612 10.9114C2.6317 10.677 2.5 10.3591 2.5 10.0276C2.5 9.69604 2.6317 9.3781 2.86612 9.14368C3.10054 8.90926 3.41848 8.77756 3.75 8.77756C4.23234 8.76916 4.70501 9.00319 5.10637 9.44914C5.50772 9.89509 5.81914 10.5323 6 11.2776C6.18086 10.5323 6.49228 9.89509 6.89363 9.44914C7.29499 9.00319 7.76766 8.76916 8.25 8.77756C8.58152 8.77756 8.89946 8.90926 9.13388 9.14368C9.3683 9.3781 9.5 9.69604 9.5 10.0276C9.5 10.3591 9.3683 10.677 9.13388 10.9114C8.89946 11.1459 8.58152 11.2776 8.25 11.2776"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
