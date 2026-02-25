import { IconProps } from "./types";

export function SubscriptionIcon({
  size = 35,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M23.3359 5.82031H11.6693C10.1222 5.82031 8.63853 6.4348 7.54456 7.52876C6.45061 8.62272 5.83594 10.1065 5.83594 11.6536V26.237C5.83594 27.7841 6.45061 29.2677 7.54456 30.3617C8.63853 31.4556 10.1222 32.0703 11.6693 32.0703H23.3359C24.8831 32.0703 26.3668 31.4556 27.4607 30.3617C28.5547 29.2677 29.1693 27.7841 29.1693 26.237V11.6536C29.1693 10.1065 28.5547 8.62272 27.4607 7.52876C26.3668 6.4348 24.8831 5.82031 23.3359 5.82031Z"
        stroke={color}
        strokeWidth="2.1875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.125 2.91406V10.2057"
        stroke={color}
        strokeWidth="2.1875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.875 2.91406V10.2057"
        stroke={color}
        strokeWidth="2.1875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6643 23.3359H20.4143"
        stroke={color}
        strokeWidth="2.1875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6643 17.5H23.331"
        stroke={color}
        strokeWidth="2.1875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SubscriptionIcon;
