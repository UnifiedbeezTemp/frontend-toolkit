import { CheckboxVisual, RadioVisual } from "./SelectedVisual"

interface SelectableOptionProps {
  label: string
  icon?: React.ReactNode
  selected: boolean
  onSelect: () => void
  variant?: "check" | "radio"
  className?: string
}

export default function SelectableOption({
  label,
  selected,
  onSelect,
  variant = "radio",
  className = "",
}: SelectableOptionProps) {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full flex items-center justify-between rounded-2xl border p-2 transition relative text-dark-base-100
        ${selected ? "border-green-50 bg-gradient-yellow-1 font-bold" : "bg-white border-input-stroke font-normal"}
        ${variant === "check" ? "flex-col items-start px-4.25 py-2.5" : "flex-row"}
        ${className}
      `}
    >
      <div className="text-base flex items-center gap-2" dangerouslySetInnerHTML={{ __html: label }} />
      {variant === "check" ? (
        <CheckboxVisual selected={selected} />
      ) : (
        <RadioVisual selected={selected} />
      )}
    </button>
  )
}
