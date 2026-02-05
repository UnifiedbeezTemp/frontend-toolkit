import ImageComponent from "../ui/ImageComponent"
import { useSupabaseIcons } from "../../lib/supabase/useSupabase"
import { cn } from "../../lib/utils"
import CheckMarkIcon from "../../assets/icons/CheckMarkIcon"

export function CheckboxVisual({
  selected,
  size,
  centerVertically,
  className,
  selectedClassName
}: {
  selected: boolean
  size?: "sm" | "md"
  centerVertically?: boolean
  className?: string
  selectedClassName?: string
}) {
  const { check } = useSupabaseIcons()
  return (
    <div
      className={cn(
        "w-5 h-5 flex items-center justify-center rounded-full border absolute right-3.25 top-3.25 shrink-0",
        selected ? selectedClassName || "bg-brand-primary border-primary" : "border-gray-300",
        size === "md" && "",
        centerVertically && "-translate-y-1/2 top-1/2",
        className
      )}
    >
      {selected && <CheckMarkIcon className="text-primary" width={10} height={10} />}
    </div>
  )
}

export function RadioVisual({
  selected,
  size,
}: {
  selected: boolean
  size?: "sm" | "md"
}) {
  return (
    <div
      className={cn(
        "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
        selected
          ? "border-brand-primary ring-4 ring-brand-primary/20 bg-green-10"
          : "border-muted",
        size === "md" && "w-5 h-5"
      )}
    >
      {selected && (
        <div className={cn("w-2 h-2 rounded-full bg-brand-primary")} />
      )}
    </div>
  )
}