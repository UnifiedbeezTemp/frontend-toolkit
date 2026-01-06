import { IconProps } from "./types"
export function UserCheckIcon({
  size = 18,
  height = 16,
  color = "currentColor",
  strokeWidth = 1.5815,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={height}
      viewBox="0 0 18 16"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M11.8615 14.2335V13.2846C11.8615 11.956 11.8615 11.2917 11.603 10.7843C11.3755 10.3379 11.0126 9.97501 10.5663 9.74757C10.0588 9.48901 9.39452 9.48901 8.06593 9.48901H4.58662C3.25804 9.48901 2.59374 9.48901 2.08629 9.74757C1.63992 9.97501 1.27701 10.3379 1.04958 10.7843C0.791016 11.2917 0.791016 11.956 0.791016 13.2846V14.2335M11.8615 2.37224L13.443 3.95375L16.606 0.790741M9.09391 3.55837C9.09391 5.08689 7.8548 6.326 6.32628 6.326C4.79776 6.326 3.55865 5.08689 3.55865 3.55837C3.55865 2.02985 4.79776 0.790741 6.32628 0.790741C7.8548 0.790741 9.09391 2.02985 9.09391 3.55837Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}