import React from "react";
import Input from "../../../forms/Input";
import PhoneInput from "../../../phone-input/PhoneInput";
import SmartDropdown from "../../../smart-dropdown/SmartDropdown";
import { DropdownItem } from "../../../smart-dropdown/DropdownItem";
import TagSelectorDropdown from "../../../diary/sub-components/TagSelectorDropdown";
import { TagPill } from "../../../inbox/components/TagPill";
import { useCreateContact } from "./useCreateContact";
import { Tag } from "../../../../store/slices/tagSlice";
import ChevronDownIcon from "../../../../assets/icons/ChevronDownIcon";
import Button from "../../../ui/Button";

interface CreateContactFormProps {
  onClose: () => void;
}

export default function CreateContactForm({ onClose }: CreateContactFormProps) {
  const {
    formState,
    allTags,
    selectedTags,
    selectedTagIds,
    automationTypes,
    isListDropdownOpen,
    isTagDropdownOpen,
    listTriggerRef,
    tagTriggerRef,
    handleInputChange,
    handleToggleTag,
    handleRemoveTag,
    toggleListDropdown,
    closeListDropdown,
    toggleTagDropdown,
    closeTagDropdown,
    handleListSelect,
    handleSubmit,
  } = useCreateContact(onClose);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-[2rem] pt-[1.6rem] sm:pt-[2.4rem]"
    >
      <div className="flex flex-col gap-[1.6rem]">
        <Input
          label="First name"
          placeholder="Enter first name"
          value={formState.firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("firstName", e.target.value)
          }
          showRequired
          className="flex-1"
        />
        <Input
          label="Last name"
          placeholder="Enter last name"
          value={formState.lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("lastName", e.target.value)
          }
          showRequired
          className="flex-1"
        />
      </div>

      <Input
        label="Email"
        placeholder="Enter email"
        type="email"
        value={formState.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange("email", e.target.value)
        }
        className="w-full"
      />

      <PhoneInput
        value={formState.phoneNumber}
        onChange={(val: string) => handleInputChange("phoneNumber", val)}
        countryCode={formState.countryCode}
        onCountryChange={(code: string) =>
          handleInputChange("countryCode", code)
        }
        isEditing={true}
        className="w-full"
      />

      <div className="flex flex-col gap-[0.8rem] relative">
        <label className="text-text-secondary text-[1.6rem] font-[700]">
          Add to list
        </label>
        <button
          type="button"
          ref={listTriggerRef}
          onClick={toggleListDropdown}
          className="w-full flex items-center justify-between px-[1.4rem] py-[1rem] border border-border rounded-[0.8rem] bg-primary text-[1.4rem] hover:border-brand-primary transition-colors"
        >
          <span
            className={
              formState.list ? "text-text-primary" : "text-inactive-color"
            }
          >
            {formState.list || "Select a list"}
          </span>
          <ChevronDownIcon size={16} color="var(--text-primary-2)" />
        </button>
        <SmartDropdown
          isOpen={isListDropdownOpen}
          onClose={closeListDropdown}
          triggerRef={listTriggerRef}
        >
          <div className="p-2">
            {automationTypes.map((type: string) => (
              <DropdownItem
                key={type}
                onClick={() => handleListSelect(type)}
                className={formState.list === type ? "bg-accent" : ""}
              >
                {type}
              </DropdownItem>
            ))}
          </div>
        </SmartDropdown>
      </div>

      <div className="flex flex-col gap-[0.8rem] relative">
        <label className="text-text-secondary text-[1.6rem] font-[700]">
          Add tags
        </label>
        <div
          ref={tagTriggerRef as any}
          onClick={toggleTagDropdown}
          className="w-full min-h-[4.4rem] flex flex-wrap items-center gap-[0.8rem] px-[1.4rem] py-[0.8rem] border border-border rounded-[0.8rem] bg-primary cursor-pointer hover:border-brand-primary transition-colors"
        >
          {selectedTags.length > 0 ? (
            selectedTags.map((tag: Tag) => (
              <TagPill
                key={tag.id}
                label={tag.label}
                isDismissable
                className="p-[1rem] rounded-[.8rem]"
                onDismiss={(e: React.MouseEvent) => {
                  e?.stopPropagation();
                  handleRemoveTag(tag.id);
                }}
              />
            ))
          ) : (
            <span className="text-inactive-color text-[1.4rem]">
              Select tags
            </span>
          )}
          <div className="ml-auto">
            <ChevronDownIcon size={16} color="var(--text-primary-2)" />
          </div>
        </div>
        <TagSelectorDropdown
          isOpen={isTagDropdownOpen}
          onClose={closeTagDropdown}
          triggerRef={tagTriggerRef}
          allTags={allTags}
          selectedTags={selectedTagIds}
          onToggleTag={handleToggleTag}
        />
      </div>

      <div className="flex items-center gap-[1.2rem] mt-[1rem]">
        <Button variant="secondary" type="button" onClick={onClose} className="w-full">
          Cancel
        </Button>
        <Button type="submit" className="w-full">Add</Button>
      </div>
    </form>
  );
}
