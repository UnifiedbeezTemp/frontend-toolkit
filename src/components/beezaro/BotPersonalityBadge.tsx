
import { PropsWithChildren, useMemo } from "react"
import { cn } from "../../lib/utils"

export default function BotPersonalityBadge({
  children,
  theme,
  className
}: PropsWithChildren & { theme?: "green" | "yellow" | "blue" | "default", className?: string }) {
  const botPersonalityThemeMappinng = useMemo(
    () => ({
      default: "bg-brand-primary/10 text-brand-primary border-brand-primary/40",
      green: "bg-success/10 text-success border-success/40",
      blue: "bg-primary-blue/10 text-primary-blue border-primary-blue/40",
      yellow: "bg-warning/10 text-warning border-warning/40",
    }),
    []
  )
  return (
    <p
      className={cn(`border badge ${botPersonalityThemeMappinng[theme as keyof typeof botPersonalityThemeMappinng]}`, className)}
    >
      {children}
    </p>
  )
}