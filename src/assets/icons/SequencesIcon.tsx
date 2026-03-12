import { IconProps } from "./types";

export default function SequencesIcon({
  size = 27,
  color = "var(--text-primary)",
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 27 27"
      fill="none"
      {...props}
    >
      <path
        d="M10.0645 3.35449H5.5918C4.35671 3.35449 3.35547 4.35573 3.35547 5.59082V10.0635C3.35547 11.2986 4.35671 12.2998 5.5918 12.2998H10.0645C11.2995 12.2998 12.3008 11.2986 12.3008 10.0635V5.59082C12.3008 4.35573 11.2995 3.35449 10.0645 3.35449Z"
        stroke={color}
        strokeWidth="2.23633"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.82617 12.2998V16.7725C7.82617 17.3656 8.06178 17.9344 8.48118 18.3538C8.90057 18.7732 9.46939 19.0088 10.0625 19.0088H14.5352"
        stroke={color}
        strokeWidth="2.23633"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.2441 14.5361H16.7715C15.5364 14.5361 14.5352 15.5374 14.5352 16.7725V21.2451C14.5352 22.4802 15.5364 23.4814 16.7715 23.4814H21.2441C22.4792 23.4814 23.4805 22.4802 23.4805 21.2451V16.7725C23.4805 15.5374 22.4792 14.5361 21.2441 14.5361Z"
        stroke={color}
        strokeWidth="2.23633"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
