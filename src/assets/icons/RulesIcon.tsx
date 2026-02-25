import { IconProps } from "./types";

export function RulesIcon({
  size = 20,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={(size * 21) / 20}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M5.5 0V3.5H9V5.5H5.5V9H3.5V5.5H0V3.5H3.5V0H5.5ZM11 3.5H20V5.5H11V3.5ZM8.776 13.011L5.948 15.84L8.937 18.828L7.522 20.243L4.533 17.253L1.705 20.083L0.291 18.668L3.119 15.84L0.451 13.172L1.866 11.757L4.533 14.425L7.362 11.597L8.776 13.011ZM14.5 11.998H16.504V14.002H14.5V11.998ZM11 15H20V17H11V15ZM14.5 17.998H16.504V20.002H14.5V17.998Z"
        fill={color}
      />
    </svg>
  );
}

export default RulesIcon;
