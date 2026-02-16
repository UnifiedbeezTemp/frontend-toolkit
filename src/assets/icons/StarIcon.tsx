import { IconProps } from "./types";

export function StarIcon({
  size = 78,
  className,
  fill = "#FFCC00",
  ...props
}: IconProps) {
  const height = (size * 75) / 78;
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 78 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g filter="url(#filter0_dii_star_icon)">
        <path
          d="M38.8799 1.28125L44.3827 24.7072L68.3626 22.7017L47.7837 35.1743L57.1012 57.3608L38.8799 41.6432L20.6585 57.3608L29.9761 35.1743L9.39713 22.7017L33.377 24.7072L38.8799 1.28125Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}
