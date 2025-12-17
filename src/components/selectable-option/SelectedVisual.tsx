import ImageComponent from "../ui/ImageComponent"
import { useSupabaseIcons } from "../../lib/supabase/useSupabase"
import { cn } from "../../lib/utils"

export function CheckboxVisual({
  selected,
  size
}: {
  selected: boolean
  size?: "sm" | "md"
}) {
  const { check } = useSupabaseIcons()
  return (
    <div
      className={cn(
        "w-5 h-5 flex items-center justify-center rounded-full border absolute right-3.25 top-3.25 shrink-0",
        selected ? "bg-brand-primary border-white" : "border-gray-300",
        size === "md" && ""
      )}
    >
      {selected && <ImageComponent src={check} alt="" width={26} height={26} />}
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