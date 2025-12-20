"use client"

import ImageComponent from "./ImageComponent"
import { useSupabaseIcons } from "../../lib/supabase/useSupabase"
import { cn } from "../../lib/utils"

export interface DistanceInputProps {
  value: number
  onChange: (value: number) => void
  onBlur?: (value: number) => void
  label?: string
  min?: number
  max?: number
  disabled?: boolean
  className?: string
}

export default function DistanceInput({
  value,
  onChange,
  onBlur,
  label,
  min = 0,
  max,
  disabled = false,
  className,
}: DistanceInputProps) {
  const icons = useSupabaseIcons()

  const handleDecrement = () => {
    const newValue = Math.max(min, value - 1)
    onChange(newValue)
  }

  const handleIncrement = () => {
    const newValue = max !== undefined ? Math.min(max, value + 1) : value + 1
    onChange(newValue)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue === "") {
      onChange(min)
      return
    }
    const numValue = parseInt(inputValue, 10)
    if (!isNaN(numValue)) {
      let finalValue = Math.max(min, numValue)
      if (max !== undefined) {
        finalValue = Math.min(max, finalValue)
      }
      onChange(finalValue)
    }
  }

  const canDecrement = value > min && !disabled
  const canIncrement = (max === undefined || value < max) && !disabled

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label className="text-base text-dark-base-70 font-normal">{label}</label>
      )}
      <div className="md:max-w-51.5 md:grid md:grid-cols-3 w-full *:grow *:shrink-0 flex items-stretch rounded-md border border-input-stroke bg-primary overflow-hidden divide-x divide-gray-30">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={!canDecrement}
          className={cn(
            "p-3 flex items-center justify-center",
            "transition-colors",
            canDecrement
              ? "hover:bg-input-hover cursor-pointer"
              : "opacity-50 cursor-not-allowed"
          )}
        >
          <ImageComponent
            src={icons.minus}
            alt="decrease"
            width={16}
            height={16}
            className="object-contain"
          />
        </button>
        <input
          type="number"
          value={value.toString()}
          onChange={handleInputChange}
          onBlur={() => onBlur?.(value)}
          disabled={disabled}
          className={cn(
            "text-center border-0 rounded-none focus:outline-none focus:ring-0 focus:shadow-none",
            "bg-input-filled text-black text-md inline"
          )}
          min={min}
          max={max}
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={!canIncrement}
          className={cn(
            "px-3 py-2 flex items-center justify-center",
            "transition-colors",
            canIncrement
              ? "hover:bg-input-hover cursor-pointer"
              : "opacity-50 cursor-not-allowed"
          )}
        >
          <ImageComponent
            src={icons.plus}
            alt="increase"
            width={16}
            height={16}
            className="object-contain"
          />
        </button>
      </div>
    </div>
  )
}
