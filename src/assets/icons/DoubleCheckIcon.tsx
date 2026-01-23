import React from "react";

interface DoubleCheckIconProps {
  size?: number;
  className?: string;
  color?: string;
}

const DoubleCheckIcon: React.FC<DoubleCheckIconProps> = ({
  size = 9,
  className,
  color = "#A4A3A6",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={(size / 9) * 6}
      viewBox="0 0 9 6"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.47988 0.132358C5.60128 -0.019306 5.82308 -0.0442114 5.975 0.0766939C6.12679 0.198125 6.15175 0.419859 6.03067 0.571811L2.33731 5.189C2.17109 5.39657 1.86131 5.41318 1.67324 5.22513L0.102931 3.65482C-0.0341258 3.51716 -0.0344951 3.2942 0.102931 3.15677C0.240368 3.01947 0.463365 3.01976 0.600978 3.15677L1.96621 4.52201L5.47988 0.132358ZM7.82949 0.132358C7.95098 -0.0193009 8.17272 -0.0444228 8.32461 0.0766939C8.47649 0.198196 8.50063 0.419852 8.3793 0.571811L4.68692 5.189C4.52076 5.39663 4.21096 5.41309 4.02285 5.22513L3.39199 4.59525L3.64102 4.34525L3.89004 4.09623L4.31582 4.52201L7.82949 0.132358Z"
        fill={color}
      />
    </svg>
  );
};

export default DoubleCheckIcon;
