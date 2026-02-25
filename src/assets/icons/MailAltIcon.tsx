import { IconProps } from "./types";

export function MailAltIcon({
  size = 43,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={(size * 30) / 43}
      viewBox="0 0 43 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g filter="url(#filter0_d_mail_alt)">
        <path
          d="M1.46216 24.7877V3.06831C1.46216 3.04318 1.50025 2.80436 1.57642 2.35188L14.4883 13.287L1.61451 25.5418C1.51294 25.1899 1.46216 24.9385 1.46216 24.7877ZM3.17612 0.84359C3.35387 0.768176 3.5697 0.730469 3.82362 0.730469H38.598C38.8266 0.730469 39.0551 0.768176 39.2836 0.84359L26.3337 11.8164L24.6197 13.1738L21.2299 15.9265L17.84 13.1738L16.1261 11.8164L3.17612 0.84359ZM3.21421 27.0124L16.2022 14.6821L21.2299 18.7168L26.2575 14.6821L39.2455 27.0124C39.0424 27.0878 38.8266 27.1255 38.598 27.1255H3.82362C3.62048 27.1255 3.41735 27.0878 3.21421 27.0124ZM27.9715 13.287L40.8452 2.35188C40.9214 2.57812 40.9595 2.81693 40.9595 3.06831V24.7877C40.9595 25.0139 40.9214 25.2653 40.8452 25.5418L27.9715 13.287Z"
          fill="currentColor"
        />
        <path
          d="M38.4485 26.7598H4.01099L16.2229 15.166L21.0012 19.002L21.2297 19.1855L21.4583 19.002L26.2366 15.166L38.4485 26.7598ZM13.9417 13.3027L1.83032 24.8311C1.82898 24.8147 1.82741 24.8004 1.82739 24.7881V3.08594C1.82817 3.08004 1.82979 3.07199 1.8313 3.06152C1.83192 3.05725 1.83254 3.05269 1.83325 3.04785L13.9417 13.3027ZM40.594 3.06836V24.7881C40.594 24.7913 40.593 24.7946 40.593 24.7979L28.5178 13.3018L40.593 3.0459C40.5931 3.05336 40.594 3.06087 40.594 3.06836ZM38.4202 1.0957L26.0969 11.5371L24.3928 12.8877L24.3889 12.8896L21.2297 15.4551L18.0706 12.8896L18.0667 12.8877L16.3616 11.5371H16.3625L4.03931 1.0957H38.4202Z"
          stroke="white"
          strokeWidth="0.731101"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_mail_alt"
          x="-4.43459e-05"
          y="-0.000632524"
          width="42.4217"
          height="29.3189"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.731101" />
          <feGaussianBlur stdDeviation="0.731101" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_mail_alt"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_mail_alt"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default MailAltIcon;
