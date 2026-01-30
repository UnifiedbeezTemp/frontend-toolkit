import SmartDropdown from "../../smart-dropdown/SmartDropdown";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import ImageComponent from "../../ui/ImageComponent";
import Text from "../../ui/Text";
import Heading from "../../ui/Heading";
import { cn } from "../../../lib/utils";
import { useAIReplyDelayField, OPTIONS } from "./hooks/useAIReplyDelayField";

interface AIReplyDelayFieldProps {
  value: string | null;
  onChange: (value: string) => void;
}

export default function AIReplyDelayField({
  value,
  onChange,
}: AIReplyDelayFieldProps) {
  const icons = useSupabaseIcons();
  const { isOpen, triggerRef, handleToggle, handleClose, handleSelect } =
    useAIReplyDelayField(value, onChange);

  return (
    <div className="flex flex-col gap-[0.8rem]">
      <Heading className="font-[700] text-[1.4rem] lg:text-[1.6rem]">
        AI reply delay
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
        <Text className={cn("text-[1.4rem] text-text-primary")}>
          {value || "Select option"}
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
          {OPTIONS.map((option) => (
            <button
              key={option}
              onClick={handleSelect.bind(null, option)}
              className={cn(
                "w-full px-[1.2rem] py-[1rem] rounded-[0.6rem]",
                "hover:bg-input-filled transition-colors",
                "flex items-center justify-between",
                value === option && "bg-input-filled",
              )}
            >
              <Text className="text-[1.4rem] lg:text-[1.6rem] text-text-primary">
                {option}
              </Text>
              {value === option && (
                <ImageComponent
                  src={icons.check}
                  alt="selected"
                  width={20}
                  height={20}
                />
              )}
            </button>
          ))}
        </div>
      </SmartDropdown>
    </div>
  );
}
