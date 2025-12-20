import clsx from "clsx"
import { CheckboxVisual, RadioVisual } from "./SelectedVisual"
import { cn } from "../../lib/utils"

interface SelectableOptionProps {
  label: React.ReactNode
  icon?: React.ReactNode
  selected: boolean
  onSelect: () => void
  variant?: "check" | "radio"
  className?: string
  hideIndicator?: boolean
  indicatorSize?: "sm" | "md"
  disabled?: boolean
  selectedBgClassName?: string
}

export default function SelectableOption({
  label,
  selected,
  onSelect,
  variant = "radio",
  className = "",
  hideIndicator = false,
  indicatorSize = "sm",
  disabled,
  selectedBgClassName,
}: SelectableOptionProps) {
  return (
    <button
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "w-full flex items-center justify-between rounded-2xl border px-2 py-3.5 transition relative text-dark-base-100 gap-2 text-md md:text-base",
        selected
          ? "border-primary-100 font-bold"
          : "border-input-stroke font-normal",
        variant === "check"
          ? "flex-col items-start px-4.25 py-2.5"
          : "flex-row",
        selected
          ? selectedBgClassName
            ? `${selectedBgClassName} bg-white`
            : "bg-gradient-yellow-1"
          : "bg-white",
        className
      )}
    >
      <div className="flex items-center gap-2">{label}</div>
      {!hideIndicator && (
        <>
          {variant === "check" ? (
            <CheckboxVisual selected={selected} size={indicatorSize} />
          ) : (
            <RadioVisual selected={selected} size={indicatorSize} />
          )}
        </>
      )}
    </button>
  )
}
