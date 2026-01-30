import SmartDropdown from "../../smart-dropdown/SmartDropdown";
import Text from "../../ui/Text";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import ImageComponent from "../../ui/ImageComponent";
import { cn } from "../../../lib/utils";
import Heading from "../../ui/Heading";
import {
  useUnansweredMessagesField,
  OPTIONS,
} from "./hooks/useUnansweredMessagesField";

interface UnansweredMessagesFieldProps {
  value: string | null;
  onChange: (value: string) => void;
}

export default function UnansweredMessagesField({
  value,
  onChange,
}: UnansweredMessagesFieldProps) {
  const icons = useSupabaseIcons();
  const {
    isOpen,
    triggerRef,
    showCustomInput,
    customValue,
    handleToggle,
    handleClose,
    handleSelect,
    handleCustomChange,
    handleExitCustomMode,
  } = useUnansweredMessagesField(value, onChange);

  return (
    <div className="flex flex-col gap-[0.8rem]">
      <Heading className="font-[700] text-[1.4rem]">
        Escalate after unanswered messages
      </Heading>

      {showCustomInput ? (
        <div className="relative flex items-center gap-[1.2rem] p-[1.2rem] bg-brand-primary/5 border border-brand-primary/20 rounded-[1rem]">
          <div className="flex-1 flex items-center gap-[1rem]">
            <input
              type="number"
              min="1"
              value={customValue || value?.replace(/\D/g, "") || ""}
              onChange={(e) => handleCustomChange(e.target.value)}
              placeholder="0"
              className={cn(
                "w-[8rem] px-[1.4rem] py-[1rem] border-2 rounded-[0.8rem] bg-primary border-brand-primary/30",
                "text-[1.6rem] font-[600] text-text-primary placeholder:text-text-secondary text-center",
                "focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all",
              )}
            />
            <Text className="text-[1.4rem] font-[500] text-text-primary">
              messages
            </Text>
          </div>
          <button
            onClick={handleExitCustomMode}
            className={cn(
              "px-[1.2rem] py-[0.6rem] rounded-[0.6rem] bg-primary border border-input-stroke",
              "text-text-secondary text-[1.3rem] font-[500]",
              "hover:bg-input-filled hover:border-brand-primary/50 transition-all",
            )}
          >
            Use preset
          </button>
        </div>
      ) : (
        <>
          <button
            ref={triggerRef}
            onClick={handleToggle}
            className={cn(
              "w-full p-[1.2rem] border rounded-[0.8rem] bg-primary border-input-stroke",
              "flex items-center justify-between text-left",
              "hover:border-brand-primary transition-colors",
            )}
          >
            <Text className={cn("text-[1.4rem]", "text-text-primary")}>
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
          >
            <div className="p-[0.8rem]">
              {OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "w-full p-[1.2rem] rounded-[0.6rem] text-left",
                    "hover:bg-input-filled transition-colors",
                    "flex items-center justify-between",
                    value === option && "bg-brand-primary/10",
                  )}
                >
                  <Text className="text-[1.4rem] text-text-primary">
                    {option}
                  </Text>
                  {value === option && (
                    <ImageComponent
                      src={icons.check}
                      alt="selected"
                      width={20}
                      height={20}
                      className="text-brand-primary"
                    />
                  )}
                </button>
              ))}
            </div>
          </SmartDropdown>
        </>
      )}
    </div>
  );
}
