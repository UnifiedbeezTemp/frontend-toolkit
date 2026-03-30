import SmartDropdown from "../../smart-dropdown/SmartDropdown";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import ImageComponent from "../../ui/ImageComponent";
import Text from "../../ui/Text";
import Heading from "../../ui/Heading";
import Skeleton from "../../ui/Skeleton";
import { cn } from "../../../lib/utils";
import { useTimezoneField } from "./hooks/useTimezoneField";
import { useTimezonesOptions } from "@/shared/src/api/services/configuration/hooks/useTimezonesOptions";

interface TimezoneFieldProps {
  value: string | null;
  onChange: (value: string) => void;
}

export default function TimezoneField({ value, onChange }: TimezoneFieldProps) {
  const icons = useSupabaseIcons();
  const timezonesQuery = useTimezonesOptions();
  const { isOpen, triggerRef, handleToggle, handleClose, handleSelect } =
    useTimezoneField(value, onChange);

  const options = timezonesQuery.data?.timezones ?? [];
  const resolvedValue =
    value || timezonesQuery.data?.defaultTimezone || value || "";

  const resolvedLabel =
    options.find((tz) => tz.value === resolvedValue)?.label ||
    resolvedValue ||
    "Select option";

  return (
    <div className="flex flex-col gap-[0.8rem]">
      <Heading className="font-[700] text-[1.4rem] lg:text-[1.6rem]">
        Select timezone
      </Heading>
      {timezonesQuery.isLoading ? (
        <Skeleton className="h-[4.6rem] rounded-[0.8rem]" />
      ) : (
        <>
          <button
            ref={triggerRef}
            onClick={handleToggle}
            disabled={timezonesQuery.isError}
            className={cn(
              "w-full px-[1.2rem] py-[1rem]",
              "border border-border rounded-[0.8rem]",
              "flex items-center justify-between",
              "hover:bg-input-hover transition-colors",
              timezonesQuery.isError && "opacity-60 cursor-not-allowed",
            )}
            type="button"
          >
            <Text className={cn("text-[1.4rem]", "text-text-primary")}>
              {resolvedLabel}
            </Text>
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
              {options.map((timezone) => (
                <button
                  key={timezone.value}
                  onClick={handleSelect.bind(null, timezone.value)}
                  className={cn(
                    "w-full px-[1.2rem] py-[1rem] rounded-[0.6rem]",
                    "hover:bg-input-filled transition-colors",
                    "flex items-center justify-between",
                    resolvedValue === timezone.value && "bg-input-filled",
                  )}
                  type="button"
                >
                  <Text className="text-[1.4rem] lg:text-[1.6rem] text-text-primary">
                    {timezone.label}
                  </Text>
                  {resolvedValue === timezone.value ? (
                    <ImageComponent
                      src={icons.check}
                      alt="selected"
                      width={20}
                      height={20}
                    />
                  ) : null}
                </button>
              ))}

              {options.length === 0 ? (
                <div className="p-[1.2rem]">
                  <Text className="text-text-secondary text-[1.2rem]">
                    No timezones available
                  </Text>
                </div>
              ) : null}
            </div>
          </SmartDropdown>
        </>
      )}
    </div>
  );
}
