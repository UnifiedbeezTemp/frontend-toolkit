import { IconProps } from "./types";

export function BackgroundIcon({
  size = 61,
  className,
  ...props
}: IconProps) {
  const height = size;
  return (
    <svg width="190" height="148" viewBox="0 0 190 148" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="44.8608" cy="97.1787" r="97.1794" transform="rotate(-0.403168 44.8608 97.1787)" fill="url(#paint0_linear_0_1)" fillOpacity="0.5" />
      <circle cx="44.8608" cy="97.1787" r="97.0791" transform="rotate(-0.403168 44.8608 97.1787)" stroke="url(#paint1_linear_0_1)" strokeOpacity="0.5" strokeWidth="0.200648" />
      <circle cx="92.1186" cy="166.554" r="97.1794" transform="rotate(-0.403168 92.1186 166.554)" fill="url(#paint2_linear_0_1)" fillOpacity="0.5" />
      <circle cx="92.1186" cy="166.554" r="97.0791" transform="rotate(-0.403168 92.1186 166.554)" stroke="url(#paint3_radial_0_1)" strokeOpacity="0.5" strokeWidth="0.200648" />
      <defs>
        <linearGradient id="paint0_linear_0_1" x1="44.8608" y1="-0.000663757" x2="44.8608" y2="194.358" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E6FAF2" stopOpacity="0.56" />
          <stop offset="1" stopColor="white" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="paint1_linear_0_1" x1="146.646" y1="87.517" x2="-78.4952" y2="137.399" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E6FAF2" />
          <stop offset="1" stopColor="#E6FAF2" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paint2_linear_0_1" x1="92.1186" y1="69.3743" x2="92.1186" y2="263.733" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E6FAF2" stopOpacity="0.5" />
          <stop offset="1" stopColor="#AED6C6" stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id="paint3_radial_0_1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(92.1186 166.554) rotate(89.968) scale(201.324)">
          <stop offset="0.046875" stopColor="#E6FAF2" stopOpacity="0" />
          <stop offset="1" stopColor="#E6FAF2" />
        </radialGradient>
      </defs>
    </svg>


  );
}
