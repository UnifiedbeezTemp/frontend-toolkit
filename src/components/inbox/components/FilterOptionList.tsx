import React from "react"
import { IconProps } from "../../../assets/icons/types"

export type FilterOption<TLabel extends React.ReactNode, TValue> = {
  value: TValue
  label: TLabel
}

export type FilterOptionListProps<
  TLabel extends React.ReactNode,
  TValue extends string | number
> = {
  options: Array<FilterOption<TLabel, TValue>>
  value: TValue
  onChange?: (value: FilterOption<TLabel, TValue>) => void
  className?: string
  itemClassName?: string
  selectedClassName?: string
  unselectedClassName?: string
  icon?: React.ElementType
  iconProps?: Record<string, unknown>
}

export function FilterOptionList<
  TLabel extends React.ReactNode,
  TValue extends string | number
>({
  options,
  value,
  onChange,
  className = "",
  itemClassName = "",
  selectedClassName = "bg-input-filled",
  unselectedClassName = "hover:bg-input-filled",
  icon: Icon,
  iconProps,
}: FilterOptionListProps<TLabel, TValue>) {
  return (
    <div className={["p-2 flex flex-col gap-4", className].join(" ")}>
      {options.map((option) => {
        const selected = value === option.value

        return (
          <button
            key={String(option.value)}
            type="button"
            onClick={() => onChange?.(option)}
            className={[
              "w-full rounded-[1.4rem] flex items-center gap-2.5 text-left px-1 py-2.75 text-dark-base-70 text-md transition-colors",
              selected ? selectedClassName : unselectedClassName,
              itemClassName,
            ].join(" ")}
          >
            {selected && Icon ? (
              <Icon
                className="text-brand-primary"
                width={16.6}
                height={12}
                {...(iconProps as IconProps)}
              />
            ) : null}

            {option.label}
          </button>
        )
      })}
    </div>
  )
}
