"use client"
import Heading from "../Heading";
import Text from "../Text";
import ToggleSwitch from "../ToggleSwitch";
import IconButton from "../IconButton";
import BeezoraCreateIcon from "../../../assets/icons/BeezoraCreateIcon";
import { cn } from "../../../lib/utils";
import { SmartSuggestionsProps } from "./types";
import { useSmartSuggestions } from "./hooks/useSmartSuggestions";

export default function SmartSuggestions({
  title = "Smart Suggestions by BeeBot",
  description = "Use Recommended Settings Based on My Plan & Business Type",
  isActive,
  onToggle,
  icon,
  className,
}: SmartSuggestionsProps) {
  const { handleToggle } = useSmartSuggestions(isActive, onToggle);

  return (
    <div
      className={cn(
        "bg-primary border border-input-stroke rounded-[0.9rem] p-3 lg:p-[1.49rem]",
        "grid grid-cols-[auto_1fr_auto] items-center gap-x-3 lg:flex lg:justify-between lg:gap-4",
        className
      )}
    >
      <div className="flex items-center gap-2.25 col-span-2 lg:col-span-1">
        <IconButton
          as="span"
          variant="secondary"
          ariaLabel="Smart Suggestions Icon"
          icon={icon || <BeezoraCreateIcon size={18} />}
          className="w-[2.5rem] h-[2.5rem] lg:w-[2.9rem] lg:h-[2.9rem] rounded-[0.374rem] p-1.5 flex justify-center items-center bg-primary border-input-stroke"
        /> 
        
        <div className="hidden lg:flex flex-col">
          <Heading size="xs" className="text-brand-primary lg:text-[1.8rem]">
            {title}
          </Heading>
          <Text size="sm" className="text-brand-primary lg:text-[1.3rem]">
            {description}
          </Text>
        </div>

        <Heading size="xs" className="lg:hidden text-brand-primary">
          {title}
        </Heading>
      </div>

      <div className="col-span-2 lg:hidden">
        <Text size="sm" className="text-brand-primary">
          {description}
        </Text>
      </div>

      <div className="col-start-3 row-start-1 row-span-2 flex items-center justify-end lg:col-auto lg:row-auto lg:flex-initial">
        <ToggleSwitch isActive={isActive} onToggle={handleToggle} />
      </div>
    </div>
  );
}
