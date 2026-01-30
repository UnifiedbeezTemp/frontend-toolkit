import Text from "../../ui/Text";
import { cn } from "../../../lib/utils";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import ImageComponent from "../../ui/ImageComponent";
import SmartDropdown from "../../smart-dropdown/SmartDropdown";
import Heading from "../../ui/Heading";
import { useKeywordsField } from "./hooks/useKeywordsField";

interface KeywordsFieldProps {
  value: string[];
  onChange: (keywords: string[]) => void;
}

export default function KeywordsField({ value, onChange }: KeywordsFieldProps) {
  const icons = useSupabaseIcons();
  const {
    inputValue,
    isDropdownOpen,
    inputRef,
    dropdownTriggerRef,
    availableSuggestions,
    handleKeyDown,
    handleInputChange,
    handleInputFocus,
    removeKeyword,
    addSuggestedKeyword,
    handleToggleDropdown,
    handleCloseDropdown,
    handleContainerClick,
  } = useKeywordsField(value, onChange);

  return (
    <div className="flex flex-col gap-[0.8rem]">
      <Heading className="font-[700] text-[1.4rem]">
        Escalate on keyword
      </Heading>
      <div className="relative">
        <div
          ref={dropdownTriggerRef}
          onClick={handleContainerClick}
          className={cn(
            "w-full min-h-[4.8rem] p-[1.2rem] border rounded-[0.8rem]",
            "bg-primary border-input-stroke flex flex-wrap gap-[0.8rem]",
            "items-center cursor-text",
            "hover:border-brand-primary transition-colors",
          )}
        >
          {value.map((keyword) => (
            <div
              key={keyword}
              className={cn(
                "flex items-center gap-[0.4rem] px-[.6rem] py-[0.2rem]",
                "rounded-[0.6rem] border border-input-stroke",
              )}
            >
              <Text className="text-[1.6rem] text-text-primary">{keyword}</Text>
              <button
                onClick={removeKeyword.bind(null, keyword)}
                className="ml-[0.4rem] hover:opacity-70"
              >
                <Text className="text-[1.6rem] text-text-secondary">×</Text>
              </button>
            </div>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            placeholder={value.length === 0 ? "Type keywords" : ""}
            className={cn(
              "flex-1 min-w-[12rem] bg-transparent border-0 outline-0",
              "text-[1.4rem] text-text-primary placeholder:text-text-secondary",
            )}
          />
          {value.length < 10 && (
            <button onClick={handleToggleDropdown} className="ml-auto">
              <ImageComponent
                src={icons.chevronDown}
                alt="dropdown"
                width={20}
                height={20}
                className={cn(
                  "transition-transform",
                  isDropdownOpen && "rotate-180",
                )}
              />
            </button>
          )}
        </div>
        {value.length < 10 && (
          <SmartDropdown
            isOpen={isDropdownOpen}
            onClose={handleCloseDropdown}
            triggerRef={dropdownTriggerRef}
            placement="bottom-start"
          >
            <div className="p-[0.8rem]">
              <Text className="text-brand-primary text-[1.2rem] px-[1.2rem] py-[0.8rem]">
                Brand attributes (max 10)
              </Text>
              {availableSuggestions.length > 0 ? (
                <div className="flex flex-wrap items-center gap-[0.4rem] p-[0.8rem]">
                  {availableSuggestions.map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => addSuggestedKeyword(keyword)}
                      className={cn(
                        "px-[1.2rem] py-[0.8rem] border border-input-stroke rounded-[0.6rem] text-left",
                        "hover:bg-input-filled transition-colors",
                        "flex items-center justify-between",
                      )}
                    >
                      <Text className="text-[1.4rem] text-text-primary">
                        {keyword}
                      </Text>
                      <Text className="text-[1.4rem] text-brand-primary ml-[.5rem]">
                        +
                      </Text>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-[1.2rem]">
                  <Text className="text-text-secondary text-[1.2rem]">
                    All suggestions added
                  </Text>
                </div>
              )}
            </div>
          </SmartDropdown>
        )}
      </div>
    </div>
  );
}
