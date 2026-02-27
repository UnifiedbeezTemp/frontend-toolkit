import { IconProps } from "./types";

export function TaskCheckIcon({
  size = 14,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={(size * 17) / 14}
      viewBox="0 0 14 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M5.79167 13.3333L10.5 8.625L9.29167 7.41667L5.77083 10.9375L4.02083 9.1875L2.83333 10.375L5.79167 13.3333ZM1.66667 16.6667C1.20833 16.6667 0.816111 16.5036 0.49 16.1775C0.163889 15.8514 0.000555556 15.4589 0 15V1.66667C0 1.20833 0.163333 0.816111 0.49 0.49C0.816666 0.163889 1.20889 0.000555556 1.66667 0H8.33333L13.3333 5V15C13.3333 15.4583 13.1703 15.8508 12.8442 16.1775C12.5181 16.5042 12.1256 16.6672 11.6667 16.6667H1.66667ZM7.5 5.83333V1.66667H1.66667V15H11.6667V5.83333H7.5Z"
        fill={color}
      />
    </svg>
  );
}

export default TaskCheckIcon;
