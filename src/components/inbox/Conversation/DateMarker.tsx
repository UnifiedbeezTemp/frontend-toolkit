import { HTMLAttributes } from "react";

export default function DateMarker({
  label = "Today",
  className = "",
  ...props
}: { label: string; className?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <span
      className={[
        "flex items-center justify-center mx-auto w-fit",
        "px-3 py-2 rounded-md",
        "rounded-full grad-btn",
        "text-dark-base-30 text-[1.4rem] font-bold leading-none",
        "shadow-sm",
        className,
      ].join(" ")}
      {...props}
    >
      {label}
    </span>
  )
}
