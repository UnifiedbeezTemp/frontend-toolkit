import { IconProps } from "./types";

export function UndoIcon({
  size = 20,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_undo)">
        <path
          d="M9.90078 4.12422V0.824219L5.77578 4.94922L9.90078 9.07422V5.77422C12.6315 5.77422 14.8508 7.99347 14.8508 10.7242C14.8508 13.455 12.6315 15.6742 9.90078 15.6742C7.17003 15.6742 4.95078 13.455 4.95078 10.7242H3.30078C3.30078 14.3707 6.25428 17.3242 9.90078 17.3242C13.5473 17.3242 16.5008 14.3707 16.5008 10.7242C16.5008 7.07772 13.5473 4.12422 9.90078 4.12422Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_undo">
          <rect width="19.8" height="19.8" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
