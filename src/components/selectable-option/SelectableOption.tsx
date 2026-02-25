import { CheckboxVisual, RadioVisual } from "./SelectedVisual";
import { cn } from "../../lib/utils";

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
  centerCheckIndicator?: boolean
  selectedIndicatorClassName?: string
  as?: any
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
  centerCheckIndicator,
  selectedIndicatorClassName,
  as: Component = "button"

}: SelectableOptionProps) {
  const isButton = Component === "button";

  return (
    <Component
      disabled={isButton ? disabled : undefined}
      onClick={onSelect}
      type={isButton ? "button" : undefined}
      className={cn(
        "w-full bg-primary flex items-center justify-between rounded-2xl border px-2 py-3.5 transition relative text-dark-base-100 gap-2 text-md md:text-base",
        isButton && "cursor-pointer",
        !isButton && "cursor-pointer", // Ensure cursor remains pointer if not a button but clickable
        selected
          ? "border-primary-100 font-bold"
          : "border-input-stroke font-normal",
        variant === "check"
          ? "flex-col items-start px-4.25 py-2.5"
          : "flex-row",
        selected
          ? selectedBgClassName
            ? `${selectedBgClassName}`
            : "bg-gradient-yellow-1"
          : "bg-primary",
        className
      )}
    >
      <div className="flex items-center gap-2 grow w-[calc(100%-4rem)]">{label}</div>
      {!hideIndicator && (
        <>
          {variant === "check" ? (
            <CheckboxVisual centerVertically={centerCheckIndicator} selected={selected} size={indicatorSize} selectedClassName={selectedIndicatorClassName} />
          ) : (
            <RadioVisual selected={selected} size={indicatorSize} />
          )}
        </>
      )}
    </Component>
  );
}
