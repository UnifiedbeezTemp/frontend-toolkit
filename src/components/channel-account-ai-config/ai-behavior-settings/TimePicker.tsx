import SmartDropdown from "../../smart-dropdown/SmartDropdown";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import ImageComponent from "../../ui/ImageComponent";
import Text from "../../ui/Text";
import Heading from "../../ui/Heading";
import { cn } from "../../../lib/utils";
import { useTimePicker, PERIODS, HOURS, MINUTES } from "./hooks/useTimePicker";

interface TimePickerProps {
  label: string;
  hours: string;
  minutes: string;
  period: "AM" | "PM";
  onChange: (hours: string, minutes: string, period: "AM" | "PM") => void;
}

export default function TimePicker({
  label,
  hours,
  minutes,
  period,
  onChange,
}: TimePickerProps) {
  const icons = useSupabaseIcons();
  const {
    isHoursOpen,
    isMinutesOpen,
    isPeriodOpen,
    hoursRef,
    minutesRef,
    hoursDropdownRef,
    minutesDropdownRef,
    periodRef,
    handleHoursToggle,
    handleHoursClose,
    handleHoursSelect,
    handleMinutesToggle,
    handleMinutesClose,
    handleMinutesSelect,
    handlePeriodToggle,
    handlePeriodClose,
    handlePeriodSelect,
    handleHoursChange,
    handleHoursBlur,
    handleMinutesChange,
    handleMinutesBlur,
  } = useTimePicker(hours, minutes, period, onChange);

  return (
    <div className="flex flex-col gap-[0.8rem]">
      <Heading className="font-[700] text-[1.4rem] lg:text-[1.6rem]">
        {label}
      </Heading>
      <div className="flex items-center gap-[0.8rem]">
        <div className="relative">
          <input
            ref={hoursRef}
            type="text"
            value={hours || ""}
            onChange={handleHoursChange}
            onBlur={handleHoursBlur}
            placeholder="00"
            maxLength={2}
            className={cn(
              "px-[1.2rem] py-[1rem] pr-[3.2rem]",
              "border border-border rounded-[0.8rem]",
              "hover:bg-input-hover transition-colors",
              "text-[1.4rem] lg:text-[1.6rem] text-text-primary",
              "text-center min-w-[6rem] w-auto",
              "focus:outline-none focus:border-brand-primary focus:border-(--primary-90) focus:ring-4 focus:ring-(--focus-ring) focus:outline-none",
            )}
            style={{
              width: hours ? `${Math.max(6, hours.length * 1.2)}rem` : "6rem",
            }}
          />
          <button
            ref={hoursDropdownRef}
            onClick={handleHoursToggle}
            className="absolute right-[1.2rem] top-1/2 -translate-y-1/2 cursor-pointer"
            type="button"
          >
            <ImageComponent
              src={icons.chevronDown}
              alt="dropdown"
              width={16}
              height={16}
              className={cn(
                "opacity-50 transition-transform",
                isHoursOpen && "rotate-180",
              )}
            />
          </button>
          <SmartDropdown
            isOpen={isHoursOpen}
            onClose={handleHoursClose}
            triggerRef={hoursDropdownRef}
            className="!w-[6rem]"
            maxHeight="20rem"
          >
            <div className="p-[0.8rem] max-h-[20rem] overflow-y-auto">
              {HOURS.map((hour) => (
                <button
                  key={hour}
                  onClick={() => handleHoursSelect(hour)}
                  className={cn(
                    "w-full px-[1.2rem] py-[1rem] rounded-[0.6rem]",
                    "hover:bg-input-filled transition-colors",
                    "flex items-center justify-center",
                    hours === hour && "bg-input-filled",
                  )}
                >
                  <Text className="text-[1.4rem] lg:text-[1.6rem] text-text-primary">
                    {hour}
                  </Text>
                </button>
              ))}
            </div>
          </SmartDropdown>
        </div>

        <Text className="text-[1.4rem] lg:text-[1.6rem] text-text-primary">
          :
        </Text>

        <div className="relative">
          <input
            ref={minutesRef}
            type="text"
            value={minutes || ""}
            onChange={handleMinutesChange}
            onBlur={handleMinutesBlur}
            placeholder="00"
            maxLength={2}
            className={cn(
              "px-[1.2rem] py-[1rem] pr-[3.2rem]",
              "border border-border rounded-[0.8rem]",
              "hover:bg-input-hover transition-colors",
              "text-[1.4rem] lg:text-[1.6rem] text-text-primary",
              "text-center min-w-[6rem] w-auto",
              "focus:outline-none focus:border-brand-primary focus:border-(--primary-90) focus:ring-4 focus:ring-(--focus-ring) focus:outline-none",
            )}
            style={{
              width: minutes
                ? `${Math.max(6, minutes.length * 1.2)}rem`
                : "6rem",
            }}
          />
          <button
            ref={minutesDropdownRef}
            onClick={handleMinutesToggle}
            className="absolute right-[1.2rem] top-1/2 -translate-y-1/2 cursor-pointer"
            type="button"
          >
            <ImageComponent
              src={icons.chevronDown}
              alt="dropdown"
              width={16}
              height={16}
              className={cn(
                "opacity-50 transition-transform",
                isMinutesOpen && "rotate-180",
              )}
            />
          </button>
          <SmartDropdown
            isOpen={isMinutesOpen}
            onClose={handleMinutesClose}
            triggerRef={minutesDropdownRef}
            className="!w-[6rem]"
            maxHeight="20rem"
          >
            <div className="p-[0.8rem] max-h-[20rem] overflow-y-auto">
              {MINUTES.map((minute) => (
                <button
                  key={minute}
                  onClick={() => handleMinutesSelect(minute)}
                  className={cn(
                    "w-full px-[1.2rem] py-[1rem] rounded-[0.6rem]",
                    "hover:bg-input-filled transition-colors",
                    "flex items-center justify-center",
                    minutes === minute && "bg-input-filled",
                  )}
                >
                  <Text className="text-[1.4rem] lg:text-[1.6rem] text-text-primary">
                    {minute}
                  </Text>
                </button>
              ))}
            </div>
          </SmartDropdown>
        </div>

        <button
          ref={periodRef}
          onClick={handlePeriodToggle}
          className={cn(
            "px-[1.2rem] py-[1rem]",
            "border border-border rounded-[0.8rem]",
            " hover:bg-input-hover transition-colors",
            "flex items-center justify-center w-[6rem]",
          )}
        >
          <Text className="text-[1.4rem] lg:text-[1.6rem] text-text-primary">
            {period}
          </Text>
          <ImageComponent
            src={icons.chevronDown}
            alt="dropdown"
            width={16}
            height={16}
            className={cn(
              "ml-[0.4rem] transition-transform",
              isPeriodOpen && "rotate-180",
            )}
          />
        </button>

        <SmartDropdown
          isOpen={isPeriodOpen}
          onClose={handlePeriodClose}
          triggerRef={periodRef}
          maxHeight="10rem"
        >
          <div className="p-[0.8rem]">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => handlePeriodSelect(p)}
                className={cn(
                  "w-full px-[1.2rem] py-[1rem] rounded-[0.6rem]",
                  "hover: transition-colors",
                  "flex items-center justify-center",
                  period === p && "",
                )}
              >
                <Text className="text-[1.4rem] lg:text-[1.6rem] text-text-primary">
                  {p}
                </Text>
              </button>
            ))}
          </div>
        </SmartDropdown>
      </div>
    </div>
  );
}
