import { IconProps } from "./types";

export default function NewPageIcon({
  size = 18,
  width,
  height,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M5.75 10.75H8.75M8.75 10.75H11.75M8.75 10.75V7.75M8.75 10.75V13.75M0.75 20.15V1.35C0.75 1.19087 0.813214 1.03826 0.925736 0.925736C1.03826 0.813214 1.19087 0.75 1.35 0.75H13.002C13.1611 0.75014 13.3136 0.813446 13.426 0.926L16.574 4.074C16.63 4.1299 16.6743 4.19632 16.7045 4.26943C16.7347 4.34254 16.7502 4.4209 16.75 4.5V20.15C16.75 20.2288 16.7345 20.3068 16.7043 20.3796C16.6742 20.4524 16.63 20.5185 16.5743 20.5743C16.5185 20.63 16.4524 20.6742 16.3796 20.7043C16.3068 20.7345 16.2288 20.75 16.15 20.75H1.35C1.27121 20.75 1.19319 20.7345 1.12039 20.7043C1.04759 20.6742 0.981451 20.63 0.925736 20.5743C0.870021 20.5185 0.825825 20.4524 0.795672 20.3796C0.76552 20.3068 0.75 20.2288 0.75 20.15Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.75 0.75V4.15C12.75 4.30913 12.8132 4.46174 12.9257 4.57426C13.0383 4.68679 13.1909 4.75 13.35 4.75H16.75"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
