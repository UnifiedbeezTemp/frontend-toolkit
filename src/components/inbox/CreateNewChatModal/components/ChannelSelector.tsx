"use client"

import { SmartDropdown, DropdownItem } from "../../../smart-dropdown"
import Button from "../../../ui/Button"
import ImageComponent from "../../../ui/ImageComponent"
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase"
import { cn } from "../../../../lib/utils"
import { channelOptions } from "../constants"
import Input from "../../../ui/Input"
import ChevronDownIcon from "../../../../assets/icons/ChevronDownIcon"

import { ChannelSelectorProps } from "../types"

export default function ChannelSelector({
  selectedChannel,
  selectedChannelLabel,
  isOpen,
  onToggle,
  onClose,
  onSelect,
  triggerRef,
}: ChannelSelectorProps) {
  const icons = useSupabaseIcons()

  return (
    <div className="relative">
      <Input
        ref={triggerRef}
        onClick={onToggle}
        className="w-full placeholder:text-md text-md cursor-pointer"
        value={selectedChannelLabel || "Select a communication channel"}
        readOnly
      />

      <SmartDropdown
        isOpen={isOpen}
        onClose={onClose}
        triggerRef={triggerRef}
        className="min-w-2xs"
        maxHeight="20rem"
        placement="bottom-start"
      >
        <div className="flex flex-col p-1">
          {channelOptions.map((option) => (
            <DropdownItem
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={cn(
                "px-3 py-2 rounded-md",
                selectedChannel === option.value && "bg-input-filled"
              )}
            >
              <span className="dark-base-70 text-md transition-colors">
                {option.label}
              </span>
            </DropdownItem>
          ))}
        </div>
      </SmartDropdown>
    </div>
  )
}
