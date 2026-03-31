import { IconProps } from "./types"

export default function StickerIcon({
  size,
  width = size ?? 51,
  height = size ?? 51,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg {...props} width={size || width} height={size || height} viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M45.6875 25.5L25.5 45.6875C21.5073 45.6875 17.6043 44.5035 14.2844 42.2853C10.9646 40.0671 8.37714 36.9142 6.84919 33.2254C5.32125 29.5366 4.92147 25.4776 5.70041 21.5616C6.47935 17.6456 8.40202 14.0486 11.2253 11.2253C14.0486 8.40202 17.6456 6.47935 21.5616 5.70041C25.4776 4.92147 29.5366 5.32125 33.2254 6.84919C36.9142 8.37714 40.0671 10.9646 42.2853 14.2844C44.5035 17.6043 45.6875 21.5073 45.6875 25.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25.5018 45.6872C24.6172 43.48 24.2116 41.11 24.3118 38.7342C24.3292 34.9202 25.8567 31.2684 28.56 28.5778C31.2633 25.8873 34.9223 24.3771 38.7363 24.3777C41.1115 24.287 43.4795 24.6923 45.6893 25.5677" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  )
}
