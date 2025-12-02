import { CheckboxVisual, RadioVisual } from "./SelectedVisual"

interface SelectableOptionProps {
  label: React.ReactNode
  icon?: React.ReactNode
  selected: boolean
  onSelect: () => void
  variant?: "check" | "radio"
  className?: string
  hideIndicator?: boolean
}

export default function SelectableOption({
  label,
  selected,
  onSelect,
  variant = "radio",
  className = "",
  hideIndicator = false
}: SelectableOptionProps) {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full flex items-center justify-between rounded-2xl border px-2 py-2.75 transition relative text-dark-base-100 gap-2
        ${selected ? "border-green-50 bg-gradient-yellow-1 font-bold" : "bg-white border-input-stroke font-normal"}
        ${variant === "check" ? "flex-col items-start px-4.25 py-2.5" : "flex-row"}
        ${className}
      `}
    >
      <div className="text-base flex items-center gap-2">{label}</div>
      {!hideIndicator && <>
        {variant === "check" ? (
            <CheckboxVisual selected={selected} />
          ) : (
            <RadioVisual selected={selected} />
        )}
      </>}
    </button>
  )
}
