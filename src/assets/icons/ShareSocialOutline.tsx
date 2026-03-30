import { IconProps } from "./types"

export default function ShareSocialOutlineIcon({
  size,
  width = size ?? 61,
  height = size ?? 61,
  color = "currentColor",
  className,
  ...props
}: IconProps) {
  return (
    <svg {...props} width={size || width} height={size || height} viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.25 36.2188C18.4084 36.2188 20.9688 33.6584 20.9688 30.5C20.9688 27.3416 18.4084 24.7812 15.25 24.7812C12.0916 24.7812 9.53125 27.3416 9.53125 30.5C9.53125 33.6584 12.0916 36.2188 15.25 36.2188Z" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M45.75 19.0625C48.9084 19.0625 51.4688 16.5021 51.4688 13.3438C51.4688 10.1854 48.9084 7.625 45.75 7.625C42.5916 7.625 40.0312 10.1854 40.0312 13.3438C40.0312 16.5021 42.5916 19.0625 45.75 19.0625Z" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M45.75 53.375C48.9084 53.375 51.4688 50.8146 51.4688 47.6562C51.4688 44.4979 48.9084 41.9375 45.75 41.9375C42.5916 41.9375 40.0312 44.4979 40.0312 47.6562C40.0312 50.8146 42.5916 53.375 45.75 53.375Z" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.2344 33.3027L40.7671 44.8522M40.7671 16.1465L20.2344 27.696" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
