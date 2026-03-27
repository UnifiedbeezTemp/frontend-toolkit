
import { cn } from "../../lib/utils"

export type LayoutType = "1" | "2" | "3" | "4" | "1:2" | "2:1" | "1:3" | "3:1"

const LAYOUT_FRACTIONS: Record<LayoutType, number[]> = {
  "1":   [1],
  "2":   [1, 1],
  "3":   [1, 1, 1],
  "4":   [1, 1, 1, 1],
  "1:2": [1, 2],
  "2:1": [2, 1],
  "1:3": [1, 3],
  "3:1": [3, 1],
}

interface LayoutIconProps {
  layout: LayoutType
  className?: string
}

export function LayoutIcon({ layout, className }: LayoutIconProps) {
  const fractions = LAYOUT_FRACTIONS[layout]
  const gridTemplateColumns = fractions.map(f => `${f}fr`).join(" ")

  return (
    <div
      className={cn("grid gap-1 w-20 h-8 border-input-stroke items-center border p-2 rounded-[.2rem]", className)}
      style={{ gridTemplateColumns }}
    >
      {fractions.map((_, idx) => (
        <div
          key={idx}
          className="h-4 border border-dashed border-input-stroke bg-input-filled rounded-[.4rem]"
        />
      ))}
    </div>
  )
}

export default LayoutIcon
