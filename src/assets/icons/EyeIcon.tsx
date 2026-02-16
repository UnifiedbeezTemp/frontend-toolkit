import { IconProps } from "./types";

export function EyeIcon({
  size = 14,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={(size * 10) / 14}
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M0.66492 5.32074C0.579804 5.18596 0.537245 5.11857 0.513421 5.01463C0.495526 4.93656 0.495526 4.81344 0.513421 4.73537C0.537245 4.63143 0.579803 4.56404 0.66492 4.42926C1.3683 3.31553 3.46197 0.5 6.6526 0.5C9.84322 0.5 11.9369 3.31553 12.6403 4.42926C12.7254 4.56404 12.7679 4.63143 12.7918 4.73537C12.8097 4.81344 12.8097 4.93656 12.7918 5.01463C12.7679 5.11857 12.7254 5.18596 12.6403 5.32074C11.9369 6.43447 9.84322 9.25 6.6526 9.25C3.46197 9.25 1.3683 6.43447 0.66492 5.32074Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.6526 6.75C7.68813 6.75 8.5276 5.91053 8.5276 4.875C8.5276 3.83947 7.68813 3 6.6526 3C5.61706 3 4.7776 3.83947 4.7776 4.875C4.7776 5.91053 5.61706 6.75 6.6526 6.75Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default EyeIcon;
