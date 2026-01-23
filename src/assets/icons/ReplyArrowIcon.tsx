import React from "react";

interface ReplyArrowIconProps {
  size?: number;
  className?: string;
  color?: string;
}

const ReplyArrowIcon: React.FC<ReplyArrowIconProps> = ({
  size = 12,
  className,
  color = "#007AFF",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      className={className}
    >
      <g clipPath="url(#clip0_2968_18539)">
        <path
          d="M9.76819 5.9236C9.88289 5.82529 9.94024 5.77613 9.96125 5.71764C9.97969 5.6663 9.97969 5.61014 9.96125 5.5588C9.94024 5.50031 9.88289 5.45115 9.76819 5.35284L5.78834 1.94154C5.59091 1.77231 5.49219 1.68769 5.40861 1.68562C5.33597 1.68382 5.26659 1.71573 5.22068 1.77205C5.16786 1.83686 5.16786 1.96688 5.16786 2.22692V4.24499C4.16492 4.42045 3.24699 4.92865 2.56484 5.69172C1.82114 6.52363 1.40976 7.60023 1.40918 8.7161V9.00363C1.9022 8.40972 2.51776 7.92938 3.2137 7.59552C3.82728 7.30117 4.49056 7.12681 5.16786 7.08086V9.04952C5.16786 9.30956 5.16786 9.43958 5.22068 9.50439C5.26659 9.56071 5.33597 9.59262 5.40861 9.59082C5.49219 9.58875 5.59091 9.50413 5.78834 9.3349L9.76819 5.9236Z"
          stroke={color}
          strokeWidth="0.704753"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2968_18539">
          <rect width="11.2761" height="11.2761" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ReplyArrowIcon;
