import SmartDropdown from "../../smart-dropdown/SmartDropdown";
import Text from "../../ui/Text";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import ImageComponent from "../../ui/ImageComponent";
import { cn } from "../../../lib/utils";
import Heading from "../../ui/Heading";
import {
  useFollowUpContentTypeField,
  OPTIONS,
} from "./hooks/useFollowUpContentTypeField";

interface FollowUpContentTypeFieldProps {
  value: string | null;
  onChange: (value: string) => void;
}

export default function FollowUpContentTypeField({
  value,
  onChange,
}: FollowUpContentTypeFieldProps) {
  const icons = useSupabaseIcons();
  const { isOpen, triggerRef, handleToggle, handleClose, handleSelect } =
    useFollowUpContentTypeField(value, onChange);

  return (
    <div className="flex flex-col gap-[0.8rem]">
      <Heading className="font-[700] text-[1.4rem] lg:text-[1.6rem]">
        Follow-Up Content Type
      </Heading>
      <button
        ref={triggerRef}
        onClick={handleToggle}
        className={cn(
          "w-full p-[1.2rem] border rounded-[0.8rem] bg-primary border-input-stroke",
          "flex items-center justify-between text-left",
          "hover:border-brand-primary transition-colors",
        )}
      >
        <Text
          className={cn("text-[1.4rem] lg:text-[1.6rem]", "text-text-primary")}
        >
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
                "w-full p-[1.2rem] rounded-[0.6rem] text-left",
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
                  className="text-brand-primary"
                />
              )}
            </button>
          ))}
        </div>
      </SmartDropdown>
    </div>
  );
}
