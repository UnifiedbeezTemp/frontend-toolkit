import SmartDropdown from "../../smart-dropdown/SmartDropdown";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import ImageComponent from "../../ui/ImageComponent";
import Text from "../../ui/Text";
import Heading from "../../ui/Heading";
import { cn } from "../../../lib/utils";
import { useWorkingDaysField, DAYS } from "./hooks/useWorkingDaysField";

interface WorkingDaysFieldProps {
  value: string[];
  onChange: (days: string[]) => void;
}

export default function WorkingDaysField({
  value,
  onChange,
}: WorkingDaysFieldProps) {
  const icons = useSupabaseIcons();
  const { isOpen, triggerRef, handleToggle, handleClose, toggleDay } =
    useWorkingDaysField(value, onChange);

  return (
    <div className="flex flex-col gap-[0.8rem]">
      <Heading className="font-[700] text-[1.4rem] lg:text-[1.6rem]">
        Working Days
      </Heading>
      <button
        ref={triggerRef}
        onClick={handleToggle}
        className={cn(
          "w-full px-[1.2rem] py-[1rem]",
          "border border-border rounded-[0.8rem]",
          "flex items-center justify-between",
          "hover:bg-input-hover transition-colors",
        )}
      >
        <div className="flex items-center gap-[0.8rem] flex-wrap">
          {value.length > 0 ? (
            value.map((dayValue) => {
              const label =
                DAYS.find((d) => d.value === dayValue)?.label || dayValue;
              return (
                <span
                  key={dayValue}
                  className="px-[0.8rem] py-[0.4rem] border border-input-stroke text-text-primary rounded-[0.4rem] text-[1.2rem]"
                >
                  {label}
                </span>
              );
            })
          ) : (
            <Text className="text-[1.4rem] text-text-primary">
              Select option
            </Text>
          )}
        </div>
        <ImageComponent
          src={icons.chevronDown}
          alt="dropdown"
          width={20}
          height={20}
          className={cn("transition-transform", isOpen && "rotate-180")}
        />
      </button>
      <SmartDropdown
        isOpen={isOpen}
        onClose={handleClose}
        triggerRef={triggerRef}
        maxHeight="50rem"
      >
        <div className="p-[0.8rem]">
          {DAYS.map((day) => {
            const isSelected = value.includes(day.value);
            return (
              <button
                key={day.value}
                onClick={toggleDay.bind(null, day.value)}
                className={cn(
                  "w-full px-[1.2rem] py-[1rem] rounded-[0.6rem]",
                  "hover:bg-input-filled transition-colors",
                  "flex items-center justify-between",
                  isSelected && "bg-input-filled",
                )}
              >
                <Text className="text-[1.4rem] text-text-primary">
                  {day.label}
                </Text>
                {isSelected ? (
                  <ImageComponent
                    src={icons.checkboxBase2}
                    alt="selected"
                    width={20}
                    height={20}
                  />
                ) : (
                  <div className="w-[15px] h-[15px] border border-input-stroke rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </SmartDropdown>
    </div>
  );
}
