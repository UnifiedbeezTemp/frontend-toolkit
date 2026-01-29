import { IconProps } from "./types"

export function FileCheckIcon({
  size = 18,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M3 1H2C1.73478 1 1.48043 1.10536 1.29289 1.29289C1.10536 1.48043 1 1.73478 1 2V16L2.5 19L4 16V2C4 1.73478 3.89464 1.48043 3.70711 1.29289C3.51957 1.10536 3.26522 1 3 1Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M20 10.001V6.001C20 3.643 20 2.465 19.268 1.732C18.535 1 17.357 1 15 1H12C9.643 1 8.464 1 7.732 1.732C7 2.465 7 3.643 7 6.001V14.001C7 16.359 7 17.538 7.732 18.271C8.352 18.891 9.293 18.985 11 19M11 5H16M11 9H16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 17C13 17 14.5 17.5 15.5 19C15.5 19 17 15 21 13M1 5H4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
