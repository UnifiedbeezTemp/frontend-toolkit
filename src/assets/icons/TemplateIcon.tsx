import { IconProps } from "./types";

export function TemplateIcon({
  size = 66,
  className,
  ...props
}: IconProps) {
  const height = Math.round((size * 52) / 66);
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={height}
      viewBox="0 0 66 52"
      fill="none"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_template)">
        <path
          d="M21.208 17.1025H6.37988L13.7939 10.3037L21.208 17.1025Z"
          fill="white"
          stroke="#545859"
          strokeWidth="0.551764"
        />
        <path
          d="M14.9824 16.5527H-2.29883L6.34082 8.10938L14.9824 16.5527Z"
          fill="white"
          stroke="#545859"
          strokeWidth="0.551764"
        />
      </g>
      <rect
        x="0.275882"
        y="15.7261"
        width="15.4494"
        height="19.8635"
        rx="1.93118"
        transform="rotate(-90 0.275882 15.7261)"
        stroke="#545859"
        strokeWidth="0.551764"
      />
      <rect
        x="0.275882"
        y="51.5894"
        width="33.1059"
        height="19.8635"
        rx="1.93118"
        transform="rotate(-90 0.275882 51.5894)"
        stroke="#545859"
        strokeWidth="0.551764"
      />
      <g clipPath="url(#clip1_template)">
        <path
          d="M43.8252 17.1025H28.9971L36.4111 10.3037L43.8252 17.1025Z"
          fill="white"
          stroke="#545859"
          strokeWidth="0.551764"
        />
        <path
          d="M37.6035 16.5527H20.3223L28.9619 8.10938L37.6035 16.5527Z"
          fill="white"
          stroke="#545859"
          strokeWidth="0.551764"
        />
      </g>
      <rect
        x="22.897"
        y="15.7261"
        width="15.4494"
        height="19.8635"
        rx="1.93118"
        transform="rotate(-90 22.897 15.7261)"
        stroke="#545859"
        strokeWidth="0.551764"
      />
      <rect
        x="22.897"
        y="51.5894"
        width="33.1059"
        height="19.8635"
        rx="1.93118"
        transform="rotate(-90 22.897 51.5894)"
        stroke="#545859"
        strokeWidth="0.551764"
      />
      <g clipPath="url(#clip2_template)">
        <path
          d="M66.4502 17.1025H51.6221L59.0361 10.3037L66.4502 17.1025Z"
          fill="white"
          stroke="#545859"
          strokeWidth="0.551764"
        />
        <path
          d="M60.2285 16.5527H42.9473L51.5869 8.10938L60.2285 16.5527Z"
          fill="white"
          stroke="#545859"
          strokeWidth="0.551764"
        />
      </g>
      <rect
        x="45.522"
        y="15.7261"
        width="15.4494"
        height="19.8635"
        rx="1.93118"
        transform="rotate(-90 45.522 15.7261)"
        stroke="#545859"
        strokeWidth="0.551764"
      />
      <rect
        x="45.522"
        y="51.5894"
        width="33.1059"
        height="19.8635"
        rx="1.93118"
        transform="rotate(-90 45.522 51.5894)"
        stroke="#545859"
        strokeWidth="0.551764"
      />
      <defs>
        <clipPath id="clip0_template">
          <rect
            y="16.002"
            width="16.0012"
            height="20.4153"
            rx="2.20706"
            transform="rotate(-90 0 16.002)"
            fill="white"
          />
        </clipPath>
        <clipPath id="clip1_template">
          <rect
            x="22.6211"
            y="16.002"
            width="16.0012"
            height="20.4153"
            rx="2.20706"
            transform="rotate(-90 22.6211 16.002)"
            fill="white"
          />
        </clipPath>
        <clipPath id="clip2_template">
          <rect
            x="45.2461"
            y="16.002"
            width="16.0012"
            height="20.4153"
            rx="2.20706"
            transform="rotate(-90 45.2461 16.002)"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
