import ImageComponent from "../ui/ImageComponent"
import { ErrorIconProps, SuccessIconProps } from "./types"
import { cn } from "../../lib/utils"

interface BaseIconProps {
  iconSrc: string
  size?: "sm" | "md"
  alt: string
  borderColor: string
  bgColor: string
  iconClassName?: string
}

function BaseIcon({
  iconSrc,
  size = "md",
  alt,
  borderColor,
  bgColor,
  iconClassName,
}: BaseIconProps) {
  const dimensions =
    size === "md"
      ? { container: "w-[5.6rem] h-[5.6rem] p-3", icon: 28 }
      : { container: "w-[4.8rem] h-[4.8rem] p-2", icon: 20 }

  return (
    <div
      className={cn(
        "rounded-full border-[.8rem] opacity-90 items-center flex justify-center",
        borderColor,
        bgColor,
        dimensions.container
      )}
    >
      <ImageComponent
        src={iconSrc}
        alt={alt}
        width={dimensions.icon}
        height={dimensions.icon}
        className={iconClassName}
      />
    </div>
  )
}

export function ErrorIcon({ iconSrc, size = "md" }: ErrorIconProps) {
  return (
    <BaseIcon
      iconSrc={iconSrc}
      size={size}
      alt="Warning"
      borderColor="border-danger-5"
      bgColor="bg-danger-10"
    />
  )
}

export function SuccessIcon({ iconSrc, size = "md" }: SuccessIconProps) {
  return (
    <BaseIcon
      iconSrc={iconSrc}
      size={size}
      alt="Success"
      borderColor="border-success/40"
      bgColor="bg-success/10"
      iconClassName="brightness-0"
    />
  )
}
