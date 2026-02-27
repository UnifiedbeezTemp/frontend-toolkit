"use client"
import { useId } from "react";
import { IconProps } from "./types";

export function BackgroundIcon({
  size = 61,
  className,
  ...props
}: IconProps) {
  const height = size;
  const id = useId();
  return (
    <svg width={size}
      height={size}
      className={className}
      {...props} viewBox="0 0 190 148" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="44.8608" cy="97.1787" r="97.1794" transform="rotate(-0.403168 44.8608 97.1787)" fill={`url(#paint0-${id})`} fillOpacity="0.5" />
      <circle cx="44.8608" cy="97.1787" r="97.0791" transform="rotate(-0.403168 44.8608 97.1787)" stroke={`url(#paint1-${id}`} strokeOpacity="0.5" strokeWidth="0.200648" />
      <circle cx="92.1186" cy="166.554" r="97.1794" transform="rotate(-0.403168 92.1186 166.554)" fill={`url(#paint2-${id})`} fillOpacity="0.5" />
      <circle cx="92.1186" cy="166.554" r="97.0791" transform="rotate(-0.403168 92.1186 166.554)" stroke={`url(#paint1-${id})`} strokeOpacity="0.5" strokeWidth="0.200648" />
      <defs>
        <linearGradient id={`paint0-${id}`} x1="44.8608" y1="-0.000663757" x2="44.8608" y2="194.358" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E6FAF2" stopOpacity="0.56" />
          <stop offset="1" stopColor="white" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`paint1-${id}`} x1="146.646" y1="87.517" x2="-78.4952" y2="137.399" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E6FAF2" />
          <stop offset="1" stopColor="#E6FAF2" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`paint2-${id}`} x1="92.1186" y1="69.3743" x2="92.1186" y2="263.733" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E6FAF2" stopOpacity="0.5" />
          <stop offset="1" stopColor="#AED6C6" stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id={`paint3-${id}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(92.1186 166.554) rotate(89.968) scale(201.324)">
          <stop offset="0.046875" stopColor="#E6FAF2" stopOpacity="0" />
          <stop offset="1" stopColor="#E6FAF2" />
        </radialGradient>
      </defs>
    </svg>


  );
}
